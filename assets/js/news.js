document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-news ul li');
    const newsContentTitle = document.querySelector('.news-content h2');
    const newsTable = document.getElementById('news-table');
    const loadingIndicator = document.getElementById('loading');

    // 發送API請求
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // 初次載入新聞資料
    fetchNews('http://150.230.105.85/api/v1/news?per_page=10&page=1&sort=-id');

    function fetchNews(apiUrl) {
        loadingIndicator.style.display = 'block'; // 顯示載入中

        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('網路回應出現問題，狀態碼：' + response.status);
                }
                return response.json(); // 解析為JSON格式
            })
            .then(data => {
                if (data.success && data.data && data.data.data) {
                    updateNewsTable(data.data.data);
                } else {
                    console.error('返回的數據格式不正確');
                }
                loadingIndicator.style.display = 'none'; // 隱藏載入中
            })
            .catch(error => {
                console.log('發生錯誤:', error);
                loadingIndicator.style.display = 'none'; // 隱藏載入中，即便有錯誤
            });
    }

    // 更新表格內容的函數
    function updateNewsTable(newsData) {
        newsTable.innerHTML = ''; // 清空之前的內容

        newsData.forEach(article => {
            const tr = document.createElement('tr');
            tr.className = 'news-item';
            const date = new Date(article.created_at).toLocaleDateString(); // 將日期格式化為 YYYY/MM/DD
            tr.innerHTML = `
                <td><a href="#">${article.subject}</a></td>
                <td>${date}</td>
            `;
            newsTable.appendChild(tr);
        });
    }

    // 側邊欄選項點擊事件
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

        // 根據選中的分類請求相應的資料
        fetchNews(`http://150.230.105.85/api/v1/news?filter[subject]=${category}&per_page=10&page=1&sort=-id`);
    }
});
