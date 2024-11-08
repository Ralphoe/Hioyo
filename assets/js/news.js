document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-news ul li');
    const newsContentTitle = document.querySelector('.news-content h2');
    const newsTable = document.querySelector('.news-table-container tbody');
    const data = {
        activity: [
            { title: '植物硒純度達99%，榮獲市面上同類產品，躋身國際榮譽！', date: '2024/10/20', link: 'article1.html' },
            { title: '新品上市！新品專享市民折扣特惠連結', date: '2024/10/10', link: 'article2.html' },
            { title: '數人增加，最受歡迎的保健產品', date: '2024/09/06', link: 'article3.html' }
        ],
        company: [
            { title: '公司擴大規模，服務提升', date: '2024/09/05', link: 'article4.html' },
            { title: '企業社會責任及公益活動', date: '2024/08/15', link: 'article5.html' }
        ],
        media: [
            { title: '媒體報導：專家推薦的保健飲品', date: '2024/07/22', link: 'article6.html' },
            { title: '參與國際食品博覽會的亮點', date: '2024/06/30', link: 'article7.html' }
        ]
    };

    // Sidebar click event
    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            sidebarItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            updateContent(category);
        });
    });

    function updateContent(category) {
        newsContentTitle.textContent = {
            activity: '活動訊息',
            company: '公司訊息',
            media: '媒體資訊'
        }[category];

        newsTable.innerHTML = '';
        data[category].forEach(article => {
            const tr = document.createElement('tr');
            tr.className = 'news-item';
            tr.innerHTML = `<td><a href="${article.link}">${article.title}</a></td><td>${article.date}</td>`;
            newsTable.appendChild(tr);
        });
    }
});