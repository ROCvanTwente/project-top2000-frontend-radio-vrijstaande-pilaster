let isRefreshing = false;
let refreshPromise = null;

export default async function apiFetch(url, options = {}) {
    const accessToken = authStore.getAccessToken();

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (response.status !== 401) {
        return response;
    }

    // Prevent multiple refresh calls
    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
    }

    const success = await refreshPromise;
    isRefreshing = false;

    if (!success) {
        authStore.logout();
        throw new Error("Session expired");
    }

    // Retry original request
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${authStore.getAccessToken()}`
        }
    });
}
