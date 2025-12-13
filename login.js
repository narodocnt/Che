// ===== НАЛАШТУВАННЯ =====
const GOOGLE_CLIENT_ID = "734541752522-bqp7ljgjq27k8psn3pv6g3c3rcp16fhi.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "https://narodocnt.site/oauth2callback.html";
const N8N_LOGIN_WEBHOOK = "https://n8n.narodocnt.online/webhook/google-login";

// ===== КНОПКА LOGIN =====
document.getElementById("googleLoginBtn")?.addEventListener("click", () => {
    const authUrl =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) +
        "&redirect_uri=" + encodeURIComponent(GOOGLE_REDIRECT_URI) +
        "&response_type=token id_token" +
        "&scope=" + encodeURIComponent("openid email profile") +
        "&prompt=select_account";

    window.open(authUrl, "googleLogin", "width=500,height=600");
});

// ===== ПРИЙОМ ДАНИХ З oauth2callback.html =====
window.addEventListener("message", async (event) => {
    if (event.origin !== window.location.origin) return;

    if (!event.data || !event.data.success) {
        alert("Помилка входу через Google");
        return;
    }

    const { accessToken } = event.data;

    try {
        // Отримуємо профіль користувача Google
        const userInfoRes = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        );

        const user = await userInfoRes.json();

        if (!user.email) {
            alert("Не вдалося отримати email");
            return;
        }

        // Надсилаємо у n8n
        const res = await fetch(N8N_LOGIN_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                googleId: user.sub,
                name: user.name,
                email: user.email,
                avatar: user.picture,
                loginType: "google",
            }),
        });

        const result = await res.json();

        if (result.success) {
            localStorage.setItem("user", JSON.stringify(result.user));
            window.location.href = "/"; // або dashboard.html
        } else {
            alert("Помилка входу");
        }
    } catch (err) {
        console.error(err);
        alert("Помилка з'єднання");
    }
});
