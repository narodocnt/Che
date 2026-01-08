/**
 * cheruta.js - Фінальна версія з робочою авторизацією
 */

function initRutaUI() {
    const banner = document.querySelector('.ruta-container');
    if (!banner) return;

    const oldUI = document.getElementById('ruta-interface');
    if (oldUI) oldUI.remove();

    // Створюємо інтерфейс з ПРЯМИМ викликом goToForm()
    const uiHtml = `
    <div id="ruta-interface" style="
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 100%; 
        background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent);
        padding: 20px 0 15px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100; /* Піднімаємо над усіма елементами */
    ">
        <div style="color: #f1c40f; font-weight: bold; text-transform: uppercase; font-size: 13px; margin-bottom: 10px; pointer-events: none;">
            Конкурс розпочнеться через:
        </div>

        <div style="display: flex; width: 100%; align-items: center; justify-content: space-between; padding: 0 30px; box-sizing: border-box;">
            
            <button onclick="window.open('/polozhennya.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button>

            <div id="ruta-timer" style="display: flex; gap: 15px; color: white; pointer-events: none;">
                <div class="t-box"><span id="d-val">00</span><small>днів</small></div>
                <div class="t-box"><span id="h-val">00</span><small>год</small></div>
                <div class="t-box"><span id="m-val">00</span><small>хв</small></div>
                <div class="t-box"><span id="s-val">00</span><small>сек</small></div>
            </div>

            <button onclick="goToForm()" class="r-btn btn-prim">ЗАЯВКА</button>
        </div>
    </div>

    <style>
        .r-btn {
            padding: 10px 25px;
            border-radius: 8px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            text-transform: uppercase;
            pointer-events: auto !important; /* Гарантуємо, що кнопка клікабельна */
        }
        .btn-sec { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); }
        .btn-prim { background: #ff4500; color: white; box-shadow: 0 4px 15px rgba(255,69,0,0.4); }
        .r-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        
        .t-box { text-align: center; min-width: 40px; }
        .t-box span { display: block; font-size: 20px; font-weight: 900; color: #f1c40f; line-height: 1; }
        .t-box small { font-size: 8px; text-transform: uppercase; opacity: 0.8; }

        @media (max-width: 600px) {
            .r-btn { padding: 8px 15px; font-size: 11px; }
            .t-box span { font-size: 16px; }
            #ruta-interface { padding: 10px 0; }
        }
    </style>
    `;

    banner.style.position = 'relative'; 
    banner.insertAdjacentHTML('beforeend', uiHtml);

    // Логіка відліку
    const target = new Date("March 21, 2026 09:00:00").getTime();
    const update = () => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("d-val").innerText = d.toString().padStart(2, '0');
        document.getElementById("h-val").innerText = h.toString().padStart(2, '0');
        document.getElementById("m-val").innerText = m.toString().padStart(2, '0');
        document.getElementById("s-val").innerText = s.toString().padStart(2, '0');
    };
    setInterval(update, 1000);
    update();
}

document.addEventListener('DOMContentLoaded', initRutaUI);
