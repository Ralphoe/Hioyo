document.addEventListener("DOMContentLoaded", function () {
    const footerHTML = `
      <footer id="footer" class="footer-component footer dark-background">
        <div class="footer-top">
          <div class="container">
            <div class="row gy-4">
              <div class="col-lg-4 col-md-6 footer-about">
                <a href="index.html" class="logo d-flex align-items-center">
                  <span class="sitename">享悠網</span>
                </a>
                <div class="footer-contact pt-3">
                  <p>天龐糧保科技有限公司</p>
                  <p><strong>電話:</strong> 02-2558-6666</p>
                  <p><strong>地址:</strong> 臺北市中山區長安東路2段6之1號4樓</p>
                  <p><strong>統一編號:</strong> 24346377</p>
                </div>
              </div>
  
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>首頁</h4>
                <ul>
                  <li><a href="#">關於我們</a></li>
                  <li><a href="#">最新消息</a></li>
                  <li><a href="#">會員專區</a></li>
                  <li><a href="#">產品服務</a></li>
                </ul>
              </div>
  
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>關於我們</h4>
                <ul>
                  <li><a href="#">品牌介紹</a></li>
                  <li><a href="#">經營理念</a></li>
                  <li><a href="#">線下服務據點</a></li>
                  <li><a href="#">未來市場區域</a></li>
                </ul>
              </div>
  
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>最新消息</h4>
                <ul>
                  <li><a href="#">活動訊息</a></li>
                  <li><a href="#">公司資訊</a></li>
                  <li><a href="#">媒體資訊</a></li>
                  <li><a href="#">最新上架</a></li>
                </ul>
              </div>
  
              <div class="col-lg-2 col-md-3 footer-links">
                <h4>產品服務</h4>
                <ul>
                  <li><a href="#">天龐品牌</a></li>
                  <li><a href="#">台灣優硒</a></li>
                  <li><a href="#">宏匯瑞光</a></li>
                  <li><a href="#">港墘路</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        <div class="copyright text-center">
          <div
            class="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center"
          >
            <div
              class="d-flex flex-column align-items-center align-items-lg-start"
            >
              <div>
                © Copyright <strong><span>台灣優硒</span></strong>. All Rights Reserved
                <span class="current-year"></span>
              </div>
            </div>
  
            <div class="social-links order-first order-lg-last mb-3 mb-lg-0">
              <a href="#"><i class="bi bi-twitter-x"></i></a>
              <a href="#"><i class="bi bi-facebook"></i></a>
              <a href="#"><i class="bi bi-instagram"></i></a>
              <a href="#"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>
    `;
  
    // 將生成的 footer 插入到頁面中的 body 的底部
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  
    // 初始化 footer 的動態年份
    initializeFooter();
  
    function initializeFooter() {
      const currentYearElement = document.querySelector('.current-year');
      if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
      }
  
      // Social links click listeners (optional, if specific actions needed)
      const socialLinks = document.querySelectorAll('.social-links a');
      socialLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const href = link.getAttribute('href');
          if (href) {
            window.open(href, '_blank');
          }
        });
      });
  
    }
  });