let isRefreshing = false;
let refreshPromise = null;

export default async function apiFetch(url, options = {}, retry = true) {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });

    if (response.status !== 401 || !retry) {
        return response;
    }

    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken()
            .finally(() => {
                isRefreshing = false;
            });
    }

    const success = await refreshPromise;

    if (!success) {
        localStorage.removeItem("token");
        throw new Error("Session expired");
    }
    
    const newToken = localStorage.getItem("token");

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
        },
    });
}
