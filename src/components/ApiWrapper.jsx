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
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : null;
    }

    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
            isRefreshing = false;
        });
    }

    const success = await refreshPromise;

    if (!success) {
        localStorage.removeItem("token");
        throw new Error("Session expired");
    }

    const newToken = localStorage.getItem("token");

    const retryResponse = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
        },
    });

    if (!retryResponse.ok) {
        throw new Error(`HTTP error ${retryResponse.status}`);
    }

    const retryText = await retryResponse.text();
    return retryText ? JSON.parse(retryText) : null;
}
