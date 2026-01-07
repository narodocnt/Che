function initRutaUI() {
    const banner = document.querySelector('.ruta-container');
    if (!banner) return;

    // Видаляємо старий інтерфейс, якщо він є
    const oldUI = document.getElementById('ruta-interface');
    if (oldUI) oldUI.remove();

    const uiHtml = `
    <div id="ruta-interface" style="
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 100%; 
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%);
        padding: 10px 0;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        pointer-events: none; /* Щоб не заважати клікам по картинці, якщо треба */
    ">
        <div style="padding-left: 15px; padding-bottom: 8px; pointer-events: auto;">
            <button onclick="window.open('/polozhennya.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button>
        </div>

        <div id="ruta-timer" style="display: flex; gap: 10px; color: white; padding-bottom: 8px;">
            <div class="t-box"><span id="d-val">00</span><small>дн</small></div>
            <div class="t-box"><span id="h-val">00</span><small>год</small></div>
            <div class="t-box"><span id="m-val">00</span><small>хв</small></div>
            <div class="t-box"><span id="s-val">00</span><small>сек</small></div>
        </div>

        <div style="padding-right: 15px; padding-bottom: 8px; pointer-events: auto;">
            <button onclick="goToForm()" class="r-btn btn-prim">ЗАЯВКА</button>
        </div>
    </div>

    <style>
        .r-btn {
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 11px;
            cursor: pointer;
            border: none;
            text-transform: uppercase;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6);
            transition: 0.2s;
        }
        .btn-sec { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4); }
        .btn-prim { background: #ff4500; color: white; border: 1px solid #ff4500; }
        .r-btn:hover { transform: scale(1.05); filter: brightness(1.2); }
        
        .t-box { text-align: center; min-width: 35px; }
        .t-box span { display: block; font-size: 20px; font-weight: 900; color: #f1c40f; line-height: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .t-box small { font-size: 8px; text-transform: uppercase; opacity: 0.9; font-weight: bold; }

        /* Мобільна версія: кнопки та цифри стають меншими, щоб не перекривати одна одну */
        @media (max-width: 480px) {
            .r-btn { padding: 6px 10px; font-size: 10px; }
            .t-box span { font-size: 16px; }
            .t-box { min-width: 28px; }
            #ruta-timer { gap: 6px; }
        }
    </style>
    `;

    banner.style.position = 'relative';
    banner.insertAdjacentHTML('beforeend', uiHtml);

    // Логіка відліку до 21 березня 2026, 09:00
    const target = new Date("March 21, 2026 09:00:00").getTime();
    const update = () => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) {
            document.getElementById("ruta-timer").innerHTML = "<b style='color:#f1c40f; font-size:12px;'>КОНКУРС РОЗПОЧАТО</b>";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Перевірка наявності елементів перед записом
        const dEl = document.getElementById("d-val");
        const hEl = document.getElementById("h-val");
        const mEl = document.getElementById("m-val");
        const sEl = document.getElementById("s-val");

        if(dEl) dEl.innerText = d.toString().padStart(2, '0');
        if(hEl) hEl.innerText = h.toString().padStart(2, '0');
        if(mEl) mEl.innerText = m.toString().padStart(2, '0');
        if(sEl) sEl.innerText = s.toString().padStart(2, '0');
    };
    setInterval(update, 1000);
    update();
}

// Запуск
document.addEventListener('DOMContentLoaded', initRutaUI);
