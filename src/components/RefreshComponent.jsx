export default async function refreshAccessToken() {
    const refreshToken = authStore.getRefreshToken();

    const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) return false;

    const data = await response.json();
    authStore.setTokens(data.token, data.refreshToken);
    return true;
}
