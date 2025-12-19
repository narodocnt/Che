document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("google-login-btn");
    if (!btn) return console.error("❌ Кнопка Google не знайдена");

    const GOOGLE_CLIENT_ID = "734541752522-bqp7ljgjq27k8psn3pv6g3c3rcp16fhi.apps.googleusercontent.com";

    // Ініціалізація Google Identity Services
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin
    });

    // Кнопка натиснута → показуємо popup Google
    btn.addEventListener("click", () => {
        google.accounts.id.prompt(); // відкриває вікно авторизації
    });

    // Обробка відповіді Google
    function handleGoogleLogin(response) {
        const id_token = response.credential;
        if (!id_token) {
            alert("❌ Не отримано id_token");
            return;
        }

        console.log("Отримано id_token:", id_token);

        // Надсилаємо на n8n вебхук
        fetch("https://n8n.narodocnt.online/webhook/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.href = "/dashboard.html";
            } else {
                alert("Помилка входу. Спробуйте ще раз.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Сталася помилка під час авторизації.");
        });
    }
});
