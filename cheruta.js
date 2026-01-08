function initRutaUI() {
    const banner = document.querySelector('.ruta-container');
    if (!banner) return;

    const oldUI = document.getElementById('ruta-interface');
    if (oldUI) oldUI.remove();

    // ПІДТРИМКА МАСШТАБУВАННЯ
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=yes');
    }

    const uiHtml = `
    <div id="ruta-interface" style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%); padding: 12px 0; display: flex; align-items: center; justify-content: space-between; z-index: 10001;">
        <div style="padding-left: 15px;"><button onclick="window.open('ruta-2026_polozhennia.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button></div>
        <div id="ruta-timer" style="display: flex; align-items: center; gap: 5px; color: white; font-family: monospace;">
            <span id="d-val" style="color: #f1c40f; font-size: 24px; font-weight: 900; text-shadow: 2px 2px 3px #000;">00</span>
            <div style="display: flex; align-items: center; background: transparent;">
                <span id="h-val" class="time-num">00</span><span class="dots">:</span>
                <span id="m-val" class="time-num">00</span><span class="dots">:</span>
                <span id="s-val" class="time-num">00</span>
            </div>
        </div>
        <div style="padding-right: 15px;"><button id="ruta-direct-btn" class="r-btn btn-prim">ЗАЯВКА</button></div>
    </div>
    <style>
        .r-btn { padding: 10px 18px; border-radius: 6px; font-weight: 800; font-size: 11px; cursor: pointer; border: none; text-transform: uppercase; box-shadow: 0 4px 12px rgba(0,0,0,0.5); pointer-events: auto !important; position: relative; z-index: 10002; }
        .btn-sec { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); }
        .btn-prim { background: #ff4500; color: white; }
        .time-num { color: #f1c40f; font-size: 24px; font-weight: 900; min-width: 28px; text-align: center; text-shadow: 2px 2px 3px #000; }
        .dots { color: #fff; font-size: 20px; font-weight: bold; margin: 0 2px; animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }
        @media (max-width: 480px) { .r-btn { padding: 8px 10px; font-size: 9px; } .time-num, #d-val { font-size: 18px; } }
    </style>`;

    banner.style.position = 'relative';
    banner.insertAdjacentHTML('beforeend', uiHtml);

    // НАЙПРОСТІША ПЕРЕВІРКА ЛОГІНА
    const getLoginStatus = () => {
        const btn = document.querySelector('.header-btn'); // Шукаємо вашу кнопку логіна в меню
        return (btn && btn.textContent.toLowerCase().includes('вийти')) || 
               localStorage.getItem('isLoggedIn') === 'true';
    };

    const actionBtn = document.getElementById('ruta-direct-btn');
    if (actionBtn) {
        actionBtn.onclick = function() {
            if (getLoginStatus()) {
                // Якщо залогінений - ТІЛЬКИ register.html
                window.location.href = 'register.html';
            } else {
                // Якщо ні - відкриваємо вікно логіна через вашу функцію
                if (typeof goToForm === 'function') {
                    goToForm();
                } else {
                    // Якщо функція не знайдена (як у гостьовому профілі), просто рефреш сторінки або логін
                    window.location.reload();
                }
            }
        };
    }

    // ТАЙМЕР
    const targetDate = new Date("March 21, 2026 09:00:00").getTime();
    const timerUpdate = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        if (diff < 0) { clearInterval(timerUpdate); return; }
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const dE = document.getElementById("d-val");
        const hE = document.getElementById("h-val");
        const mE = document.getElementById("m-val");
        const sE = document.getElementById("s-val");

        if (dE) dE.innerText = d.toString().padStart(2, '0');
        if (hE) hE.innerText = h.toString().padStart(2, '0');
        if (mE) mE.innerText = m.toString().padStart(2, '0');
        if (sE) sE.innerText = s.toString().padStart(2, '0');
    }, 1000);
}

// Запуск без затримок
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRutaUI);
} else {
    initRutaUI();
}
