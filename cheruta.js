/**
 * cheruta.js - Фінальна версія: кнопки в кутах, компактний таймер
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
        background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
        padding: 5px 0;
        display: flex;
        align-items: center; 
        justify-content: space-between; 
        z-index: 100;
    ">
        <div style="padding-left: 10px;">
            <button onclick="window.open('/polozhennya.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button>
        </div>

        <div id="ruta-timer" style="display: flex; gap: 6px; color: white;">
            <div class="t-box"><span id="d-val">00</span><small>дн</small></div>
            <div class="t-box"><span id="h-val">00</span><small>год</small></div>
            <div class="t-box"><span id="m-val">00</span><small>хв</small></div>
            <div class="t-box"><span id="s-val">00</span><small>сек</small></div>
        </div>

        <div style="padding-right: 10px;">
            <button onclick="window.location.href='/podaty-zayavku'" class="r-btn btn-prim">ЗАЯВКА</button>
        </div>
    </div>

    <style>
        .r-btn {
            padding: 6px 10px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 10px;
            cursor: pointer;
            border: none;
            text-transform: uppercase;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
            pointer-events: auto !important;
            white-space: nowrap;
        }
        .btn-sec { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4); }
        .btn-prim { background: #ff4500; color: white; }
        
        .t-box { text-align: center; min-width: 28px; }
        .t-box span { display: block; font-size: 16px; font-weight: 900; color: #f1c40f; line-height: 1; }
        .t-box small { font-size: 7px; text-transform: uppercase; opacity: 0.9; }

        @media (max-width: 480px) {
            .r-btn { padding: 5px 8px; font-size: 9px; }
            .t-box span { font-size: 14px; }
            .t-box { min-width: 24px; }
        }
    </style>
    `;

    banner.style.position = 'relative';
    banner.insertAdjacentHTML('beforeend', uiHtml);

    const target = new Date("March 21, 2026 09:00:00").getTime();
    const update = () => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const elD = document.getElementById("d-val");
        const elH = document.getElementById("h-val");
        const elM = document.getElementById("m-val");
        const elS = document.getElementById("s-val");

        if (elD) elD.innerText = d.toString().padStart(2, '0');
        if (elH) elH.innerText = h.toString().padStart(2, '0');
        if (elM) elM.innerText = m.toString().padStart(2, '0');
        if (elS) elS.innerText = s.toString().padStart(2, '0');
    };
    setInterval(update, 1000);
    update();
}
document.addEventListener('DOMContentLoaded', initRutaUI);
