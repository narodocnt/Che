<script>
    const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=734541752522-bqp7ljgjq27k8psn3pv6g3c3rcp16fhi.apps.googleusercontent.com&redirect_uri=https://n8n.narodocnt.online/webhook/google-signup&response_type=code&scope=openid%20email%20profile&prompt=consent";

    // Ця функція ОБОВ'ЯЗКОВО має бути тут, щоб працювали кнопки
    function handleAuthClick() {
        const user = localStorage.getItem('user');
        if (user) {
            if (confirm(`Вийти з аккаунту ${user}?`)) {
                localStorage.removeItem('user');
                location.reload();
            }
        } else {
            window.location.href = AUTH_URL;
        }
    }

    // Відновлення імені користувача на кнопці після входу
    document.addEventListener('DOMContentLoaded', function() {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        if (name) localStorage.setItem('user', decodeURIComponent(name));

        const user = localStorage.getItem('user');
        if (user) {
            const btn = document.getElementById('loginBtn');
            if (btn) {
                btn.innerText = user;
                btn.style.background = "#27ae60";
                btn.style.color = "white";
            }
        }
    });

    function closeModal() { document.getElementById('listModal').style.display = 'none'; }
</script>
