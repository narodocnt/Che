function initRutaUI() {
    const banner = document.querySelector('.ruta-container');
    if (!banner) return;

    const oldUI = document.getElementById('ruta-interface');
    if (oldUI) oldUI.remove();

    // 1. ПІДТРИМКА МАСШТАБУВАННЯ (ZOOM)
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=yes');
    }

    const uiHtml = `
    <div id="ruta-interface" style="
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 100%; 
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
        padding: 12px 0;
        display: flex;
        align-items: center; 
        justify-content: space-between; 
        z-index: 10000;
        pointer-events: none; /* Щоб не заважати клікам по самому банеру */
    ">
        <div style="padding-left: 15px; pointer-events: auto;">
            <button onclick="window.open('ruta-2026_polozhennia.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button>
        </div>

        <div id="ruta-timer" style="display: flex; align-items: center; gap: 5px; color: white; font-family: monospace;">
            <span id="d-val" style="color: #f1c40f; font-size: 24px; font-weight: 900; text-shadow: 2px 2px 4px #000;">00</span>
            <div style="display: flex; align-items: center; background: transparent;">
                <span id="h-val" class="time-num">00</span>
                <span class="dots">:</span>
                <span id="m-val" class="time-num">00</span>
                <span class="dots">:</span>
                <span id="s-val" class="time-num">00</span>
            </div>
        </div>

        <div style="padding-right: 15px; pointer-events: auto;">
            <button id="ruta-smart-btn" class="r-btn btn-prim">ЗАЯВКА</button>
        </div>
    </div>

    <style>
        .r-btn {
            padding: 10px 18px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 11px;
            cursor: pointer;
            border: none;
            text-transform: uppercase;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            transition: 0.2s;
        }
        .btn-sec { background: rgba(255,255,255,0.25); color: white; border: 1px solid rgba(255,255,255,0.4); }
        .btn-prim { background: #ff4500; color: white; }
        .time-num { color: #f1c40f; font-size: 24px; font-weight: 900; min-width: 28px; text-align: center; text-shadow: 2px 2px 4px #000; }
        .dots { color: #fff; font-size: 20px; font-weight: bold; animation: blink 1s infinite; text-shadow: 2px 2px 4px #000; }
        @keyframes blink { 50% { opacity: 0.3; } }
        @media (max-width: 480px) {
            .r-btn { padding: 8px 12px; font-size: 10px; }
            .time-num, #d-val { font-size: 18px; min-width: 22px; }
        }
    </style>`;

    banner.style.position = 'relative';
    banner.insertAdjacentHTML('beforeend', uiHtml);

    // РОЗУМНА КНОПКА: Викликає ту саму функцію, що й меню
    document.getElementById('ruta-smart-btn').onclick = function() {
        if (typeof goToForm === 'function') {
            // Викликаємо оригінальну функцію вашого сайту.
            // Вона сама знає: якщо залогінений — відкрити форму, якщо ні — показати вхід.
            goToForm(); 
        } else {
            // Запасний варіант, якщо функція не знайдена
            window.location.href = 'register.html';
        }
    };

    // Логіка таймера
    const targetDate = new Date("March 21, 2026 09:00:00").getTime();
    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;
        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("d-val").innerText = d.toString().padStart(2, '0');
        document.getElementById("h-val").innerText = h.toString().padStart(2, '0');
        document.getElementById("m-val").innerText = m.toString().padStart(2, '0');
        document.getElementById("s-val").innerText = s.toString().padStart(2, '0');
    }
    setInterval(updateTimer, 1000);
    updateTimer();
}

window.addEventListener('load', initRutaUI);
