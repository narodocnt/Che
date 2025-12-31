let currentData = [];
let lastWinner = null;

async function loadRanking() {
    const N8N_GET_RANKING_URL = "https://n8n.narodocnt.online/webhook/get-ranking";
    try {
        const response = await fetch(N8N_GET_RANKING_URL);
        currentData = await response.json();
        renderList('total'); 
    } catch (error) {
        console.error("Помилка:", error);
    }
}

function celebrate() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#e67e22', '#f1c40f']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#e67e22', '#f1c40f']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function renderList(filter = 'total') {
    const list = document.getElementById('rankingList');
    if (!list) return;
    
    list.innerHTML = '';

    // Сортування
    let sorted = [...currentData].sort((a, b) => {
        const getVal = (item) => {
            const l = parseInt(item.likes) || 0;
            const c = parseInt(item.comments) || 0;
            const s = parseInt(item.shares) || 0;
            if (filter === 'likes') return l;
            if (filter === 'comments') return c;
            if (filter === 'shares') return s;
            return l + c + s;
        };
        return getVal(b) - getVal(a);
    });

    // Перевірка на зміну лідера для запуску конфетті
    const currentWinner = sorted[0]?.url;
    if (lastWinner && lastWinner !== currentWinner) {
        celebrate();
    }
    lastWinner = currentWinner;

    // Створення кнопок-тригерів (якщо їх ще немає в HTML)
    const tabsContainer = document.querySelector('.ranking-tabs');
    if (tabsContainer) {
        tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick').includes(filter));
        });
    }

    const maxVal = Math.max(...sorted.map(item => {
        const l = parseInt(item.likes) || 0;
        const c = parseInt(item.comments) || 0;
        const s = parseInt(item.shares) || 0;
        return filter === 'total' ? (l + c + s) : (parseInt(item[filter]) || 1);
    })) || 1;

    sorted.forEach((item, index) => {
        const l = parseInt(item.likes) || 0;
        const c = parseInt(item.comments) || 0;
        const s = parseInt(item.shares) || 0;
        const currentVal = filter === 'total' ? (l + c + s) : (parseInt(item[filter]) || 0);
        const percentage = (currentVal / maxVal) * 100;
        
        const isTop = index < 3 ? `top-${index}` : '';
        const medals = ['🥇', '🥈', '🥉'];
        const medalLabel = index < 3 ? medals[index] : `#${index + 1}`;

        list.innerHTML += `
            <div class="rank-card ${isTop}">
                <div class="medal">${medalLabel}</div>
                <img src="${item.media || 'фото_для_боту.png'}" class="rank-photo">
                <div class="rank-details">
                    <div class="rank-header">
                        <span class="rank-name">${item.pageName || 'Колектив'}</span>
                        <span class="metric-info">
                            ${filter === 'total' ? `🔥 ${currentVal}` : 
                              filter === 'likes' ? `❤️ ${l}` : 
                              filter === 'comments' ? `💬 ${c}` : `🔄 ${s}`}
                        </span>
                    </div>
                    <div class="progress-wrapper">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
                <a href="${item.url}" target="_blank" class="btn-watch">Дивитись</a>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', loadRanking);
