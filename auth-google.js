/* -------------------------------
Google OAuth PKCE для GitHub Pages + n8n
--------------------------------*/

const GOOGLE_CLIENT_ID = "225496350184-8ppjonps7e592h69eltuh2t7gk71bhl8.apps.googleusercontent.com";
const REDIRECT_URI = "[https://narodocnt.online/oauth2callback.html](https://narodocnt.online/oauth2callback.html)";
const N8N_WEBHOOK = "[https://narodocnt.online:5678/webhook/google-signup](https://narodocnt.online:5678/webhook/google-signup)";

/* --- Генерація випадкового 64-символьного рядка --- */
function randomString(length = 64) {
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~";
let result = "";
for (let i = 0; i < length; i++) {
result += chars.charAt(Math.floor(Math.random() * chars.length));
}
return result;
}

/* --- SHA-256 для PKCE --- */
async function sha256(input) {
const encoder = new TextEncoder();
const data = encoder.encode(input);
const hash = await crypto.subtle.digest("SHA-256", data);
return btoa(String.fromCharCode(...new Uint8Array(hash)))
.replace(/+/g, "-").replace(///g, "_").replace(/=+$/, "");
}

/* --- Старт Google OAuth з PKCE --- */
async function startGoogleSignIn() {
const codeVerifier = randomString();
const codeChallenge = await sha256(codeVerifier);

```
localStorage.setItem("google_code_verifier", codeVerifier);

const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" + GOOGLE_CLIENT_ID +
    "&redirect_uri=" + REDIRECT_URI +       // ❗ без encode
    "&response_type=code" +
    "&scope=openid%20email%20profile" +
    "&code_challenge=" + codeChallenge +
    "&code_challenge_method=S256" +
    "&prompt=select_account";

window.location.href = authUrl;
```

}

/* --- Обробка редіректу після входу --- */
async function handleGoogleRedirect() {
const code = new URLSearchParams(window.location.search).get("code");
if (!code) return;

```
const codeVerifier = localStorage.getItem("google_code_verifier");
if (!codeVerifier) {
    alert("Відсутній code_verifier. Спробуйте ввійти ще раз.");
    return;
}

const body = new URLSearchParams();
body.append("client_id", GOOGLE_CLIENT_ID);
body.append("grant_type", "authorization_code");
body.append("code", code);
body.append("code_verifier", codeVerifier);
body.append("redirect_uri", REDIRECT_URI); // ❗ точно збігається

const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
});

const tokenData = await response.json();

if (tokenData.error) {
    alert("Google OAuth Error: " + tokenData.error + " — " + tokenData.error_description);
    return;
}

const idToken = tokenData.id_token;

await fetch(N8N_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        id_token: idToken,
        login_method: "google",
        time: new Date().toISOString()
    })
});

alert("Успішний вхід через Google!");
window.history.replaceState({}, document.title, "/");
```

}

/* --- Авто запуск, якщо це сторінка редіректу --- */
if (window.location.pathname.endsWith("/oauth2callback.html")) {
handleGoogleRedirect();
}
