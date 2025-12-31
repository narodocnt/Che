async function loadRanking() {
    const N8N_GET_RANKING_URL = "https://n8n.narodocnt.online/webhook/get-ranking";
    
    try {
        const response = await fetch(N8N_GET_RANKING_URL);
        const data = await response.json();
        const list = document.getElementById('rankingList');
        if (!list) return;

        list.innerHTML = ''; 
        data.sort((a, b) => b.likes - a.likes);
        const maxLikes = Math.max(...data.map(item => item.likes)) || 1;

        data.forEach((item, index) => {
            const percentage = (item.likes / maxLikes) * 100;
            const photoUrl = item.photo || 'фото_для_боту.png'; 
            
            list.innerHTML += `
                <div class="rank-card">
                    <img src="${photoUrl}" class="rank-photo" alt="${item.name}">
                    <div class="rank-details">
                        <div class="rank-header">
                            <span class="rank-name">#${index + 1} ${item.name || 'Колектив'}</span>
                            <span class="likes-count"><i class="fas fa-heart"></i> ${item.likes}</span>
                        </div>
                        <div class="progress-wrapper">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Помилка рейтингу:", error);
        document.getElementById('rankingList').innerHTML = "<p style='text-align:center;'>Тимчасово не вдалося завантажити рейтинг.</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadRanking);
