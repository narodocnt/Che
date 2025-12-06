/* auth-google.js — Google OAuth PKCE через n8n backend (вставити весь файл) */

const GOOGLE_CLIENT_ID = "225496350184-m83n5351r571i33mn4pk86u93aed6jnc.apps.googleusercontent.com";
const REDIRECT_URI = "https://narodocnt.online/oauth2callback.html"; // точно такий же у Google Console
const N8N_WEBHOOK = "https://narodocnt.online/api/google-signup"; // endpoint у n8n, переконайся що він доступний

function randomString(length = 64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
  let result = '';
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest("SHA-256", data);
  // Base64URL
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function startGoogleSignIn() {
  const codeVerifier = randomString();
  const codeChallenge = await sha256(codeVerifier);

  // ЗБЕРЕЖИ code_verifier у localStorage до редиректу
  localStorage.setItem("google_code_verifier", codeVerifier);

  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&response_type=code" +
    "&scope=" + encodeURIComponent("openid email profile") +
    "&code_challenge=" + encodeURIComponent(codeChallenge) +
    "&code_challenge_method=S256" +
    "&prompt=select_account";

  window.location.href = authUrl;
}

async function handleGoogleRedirect() {
  try {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;

    const codeVerifier = localStorage.getItem("google_code_verifier");
    if (!codeVerifier) {
      alert("Code verifier missing! Повторіть вхід через Google.");
      return;
    }

    console.log("Got code:", code);
    console.log("Using code_verifier:", codeVerifier);

    // Надсилаємо на n8n — n8n має зробити Token Exchange
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, code_verifier: codeVerifier, redirect_uri: REDIRECT_URI })
    });

    const text = await res.text();
    console.log("n8n response status:", res.status, "text:", text);

    // спробуємо розпарсити JSON, якщо це JSON
    let data;
    try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

    if (!res.ok) {
      alert("Помилка при обміні токенів: " + (data.error || text));
      return;
    }

    console.log("Token exchange result:", data);
    alert("Вхід через Google успішний!");
    // очистити query params
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (err) {
    console.error("handleGoogleRedirect error:", err);
    alert("Помилка в обробці редиректу. Переглянь консоль.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Прив'язати кнопку (якщо існує)
  const btn = document.getElementById("google-login-btn");
  if (btn) btn.addEventListener("click", startGoogleSignIn);

  if (window.location.pathname === "/oauth2callback.html") handleGoogleRedirect();
});
