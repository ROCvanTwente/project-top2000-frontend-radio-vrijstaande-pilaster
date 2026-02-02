export default async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) return false;

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    window.dispatchEvent(new Event("authChange"));
    return true;
}
