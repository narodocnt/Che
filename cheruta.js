/**
 * cheruta.js - Версія з цифровим годинником (двокрапки)
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
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
        padding: 10px 0;
        display: flex;
        align-items: center; 
        justify-content: space-between; 
        z-index: 100;
    ">
        <div style="padding-left: 15px;">
            <button onclick="window.open('/polozhennya.pdf', '_blank')" class="r-btn btn-sec">ПОЛОЖЕННЯ</button>
        </div>

        <div id="ruta-timer" style="display: flex; align-items: center; gap: 5px; color: white; font-family: monospace;">
            <div style="text-align: center; margin-right: 5px;">
                <span id="d-val" style="color: #f1c40f; font-size: 18px; font-weight: 900;">00</span>
                <small style="display:block; font-size: 8px; color: #fff; text-transform: uppercase;">дн</small>
            </div>
            
            <div style="display: flex; align-items: center; background: rgba(0,0,0,0.5); padding: 4px 8px; border-radius: 5px; border: 1px solid rgba(241,196,15,0.3);">
                <span id="h-val" class="time-num">00</span>
                <span class="dots">:</span>
                <span id="m-val" class="time-num">00</span>
                <span class="dots">:</span>
                <span id="s-val" class="time-num">00</span>
            </div>
        </div>

        <div style="padding-right: 15px;">
            <button onclick="window.location.href='/podaty-zayavku'" class="r-btn btn-prim">ЗАЯВКА</button>
        </div>
    </div>

    <style>
        .r-btn {
            padding: 8px 14px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 11px;
            cursor: pointer;
            border: none;
            text-transform: uppercase;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            pointer-events: auto !important;
        }
        .btn-sec { background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4); }
        .btn-prim { background: #ff4500; color: white; }
        
        .time-num { color: #f1c40f; font-size: 20px; font-weight: 900; min-width: 24px; text-align: center; }
        .dots { color: #fff; font-size: 18px; font-weight: bold; margin: 0 2px; animation: blink 1s infinite; }

        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }

        @media (max-width: 480px) {
            .r-btn { padding: 6px 10px; font-size: 9px; }
            .time-num { font-size: 16px; min-width: 18px; }
            .dots { font-size: 14px; }
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

        document.getElementById("d-val").innerText = d.toString().padStart(2, '0');
        document.getElementById("h-val").innerText = h.toString().padStart(2, '0');
        document.getElementById("m-val").innerText = m.toString().padStart(2, '0');
        document.getElementById("s-val").innerText = s.toString().padStart(2, '0');
    };
    setInterval(update, 1000);
    update();
}
document.addEventListener('DOMContentLoaded', initRutaUI);
