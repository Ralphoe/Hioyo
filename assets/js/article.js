  document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-news ul li');

    if (sidebarItems) {
      sidebarItems.forEach((item) => {
        item.addEventListener('click', function () {
          sidebarItems.forEach((el) => el.classList.remove('active'));
          this.classList.add('active');
          // 可以在這裡添加邏輯以動態加載內容
        });
      });
    }

    const prevArticle = document.querySelector('.prev-article');
    const nextArticle = document.querySelector('.next-article');

    if (prevArticle) {
      prevArticle.addEventListener('click', (e) => {
        e.preventDefault();
        // 上一篇文章的導航邏輯
      });
    }

    if (nextArticle) {
      nextArticle.addEventListener('click', (e) => {
        e.preventDefault();
        // 下一篇文章的導航邏輯
      });
    }

    // Fetch data from API and populate content
    const apiUrl = "https://dev-backend-host.hioyo.com/api/v1/news/5";

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const article = data.data;
          
          const newsTitleElement = document.getElementById('news-title');
          const newsDateElement = document.getElementById('news-date');
          const newsArticleElement = document.getElementById('news-article');
          const newsImagesContainer = document.getElementById('news-images');

          if (newsTitleElement && newsDateElement && newsArticleElement && newsImagesContainer) {
            newsTitleElement.textContent = article.subject || "標題不可用";
            newsDateElement.textContent = article.created_at ? new Date(article.created_at).toLocaleDateString() : "日期不可用";
            newsArticleElement.innerHTML = article.content || "內容不可用";

            // Add cover image
            newsImagesContainer.innerHTML = ""; // 清空現有圖片內容
            if (article.cover && article.cover.length > 0) {
              article.cover.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = article.subject;
                newsImagesContainer.appendChild(imgElement);
              });
            } else {
              newsImagesContainer.textContent = "沒有可用的圖片";
            }
          }
        } else {
          console.error('API Response Error:', data);
        }
      })
      .catch(error => console.error('Fetch Error:', error));
  });