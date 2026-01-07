/**
 * cheruta.js - Прямі посилання + Рознесені кнопки + Таймер
 */

function initRutaUI() {
    const banner = document.querySelector('.ruta-container');
    if (!banner) return;

    const oldUI = document.getElementById('ruta-interface');
    if (oldUI) oldUI.remove();

    const uiHtml = `
    <div id="ruta-interface" style="
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 100%; 
        background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%);
        padding: 10px 0;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        z-index: 1000;
    ">
        <div style="padding-left: 15px; padding-bottom: 10px;">
            <button onclick="window.open('https://narodocnt.online/polozhennya-ruta.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button>
        </div>

        <div id="ruta-timer" style="display: flex; gap: 8px; color: white; padding-bottom: 10px;">
            <div class="t-box"><span id="d-val">00</span><small>дн</small></div>
            <div class="t-box"><span id="h-val">00</span><small>год</small></div>
            <div class="t-box"><span id="m-val">00</span><small>хв</small></div>
            <div class="t-box"><span id="s-val">00</span><small>сек</small></div>
        </div>

        <div style="padding-right: 15px; padding-bottom: 10px;">
            <button onclick="window.location.href='https://narodocnt.online/form-ruta'" class="r-btn btn-prim">ЗАЯВКА</button>
        </div>
    </div>

    <style>
        .r-btn {
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 800;
            font-size: 11px;
            cursor: pointer;
            border: none;
            text-transform: uppercase;
            box-shadow: 0 4px 15px rgba(0,0,0,0.7);
            transition: 0.2s;
            pointer-events: auto !important;
        }
        .btn-sec { background: rgba(255,255,255,0.25); color: white; border: 1px solid rgba(255,255,255,0.4); backdrop-filter: blur(5px); }
        .btn-prim { background: #ff4500; color: white; }
        .r-btn:hover { transform: translateY(-2px); filter: brightness(1.2); }
        
        .t-box { text-align: center; min-width: 32px; }
        .t-box span { display: block; font-size: 19px; font-weight: 900; color: #f1c40f; line-height: 1; text-shadow: 0 2px 5px #000; }
        .t-box small { font-size: 7px; text-transform: uppercase; font-weight: bold; color: #fff; }

        @media (max-width: 480px) {
            .r-btn { padding: 8px 10px; font-size: 10px; }
            .t-box span { font-size: 15px; }
            .t-box { min-width: 26px; }
        }
    </style>
    `;

    banner.style.position = 'relative';
    banner.insertAdjacentHTML('beforeend', uiHtml);

    // Таймер зворотного відліку
    const target = new Date("March 21, 2026 09:00:00").getTime();
    const update = () => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) return;
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        if(document.getElementById("d-val")) document.getElementById("d-val").innerText = d.toString().padStart(2, '0');
        if(document.getElementById("h-val")) document.getElementById("h-val").innerText = h.toString().padStart(2, '0');
        if(document.getElementById("m-val")) document.getElementById("m-val").innerText = m.toString().padStart(2, '0');
        if(document.getElementById("s-val")) document.getElementById("s-val").innerText = s.toString().padStart(2, '0');
    };
    setInterval(update, 1000);
    update();
}

document.addEventListener('DOMContentLoaded', initRutaUI);
