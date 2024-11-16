document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
      <header id="header" class="header d-flex align-items-center position-relative">
        <div class="header-upper">
          <div class="container-fluid container-xl d-flex align-items-center justify-content-end">
            <button class="login-btn">登入</button>
            <button class="join-btn">加入我們</button>
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
            <button class="shopping-cart-btn toggle-cart-button">
              <i class="fas fa-shopping-cart"></i>
            </button>
            <!-- Shopping Cart Sidebar -->
            <div class="shopping-cart-sidebar" id="cartSidebar">
              <div class="cart-header">
                <h2>購物車(<span class="cart-current-mount">1</span>)</h2>
                <button class="close-cart-btn" id="closeCartBtn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="cart-items">
                <div class="cart-item-wrapper">
                  <img src="./assets/img/sample_img.jpg" alt="商品縮圖" class="item-thumbnail"/>
                  <div class="item-details">
                    <h4>商品名稱</h4>
                    <div class="counting-cart-item">
                      <label for="quantity"></label>
                      <input type="number" id="quantity" value="1" min="1"/>
                      <div class="nyt-count"><span class="nyt">NYT</span>50</div>
                    </div>
                  </div>
                  <button class="trash-btn">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <!-- Add more cart items here -->
              </div>
              <div class="cart-footer">
                <div class="total-amount">HYT｜100</div>
                <button class="checkout-btn">結帳</button>
              </div>
            </div>
          </div>
        </div>
        <div class="header-lower">
          <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
            <a href="index.html" class="logo d-flex align-items-center">
              <img src="./assets/img/hioyo.svg" alt="hioyo"/>
            </a>
            <nav id="navmenu" class="navmenu">
              <ul>
                <li><a href="index.html">服務總攬</a></li>
                <li><a href="about.html">關於我們</a></li>
                <li><a href="news.html">最新消息</a></li>
                <li><a href="product.html">產品服務</a></li>
                <li><a href="contact.html">聯絡我們</a></li>
                <li class="dropdown">
                  <a href="#">
                    <span>會員專區</span>
                    <i class="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li><a href="#">登入</a></li>
                    <li class="dropdown">
                      <a href="#">
                        <span>加入我們</span>
                        <i class="bi bi-chevron-down toggle-dropdown"></i>
                      </a>
                      <ul>
                        <li><a href="#">Deep Dropdown 1</a></li>
                        <li><a href="#">Deep Dropdown 2</a></li>
                        <li><a href="#">Deep Dropdown 3</a></li>
                        <li><a href="#">Deep Dropdown 4</a></li>
                        <li><a href="#">Deep Dropdown 5</a></li>
                      </ul>
                    </li>
                    <li><a href="#">購物車</a></li>
                    <li><a href="#">Dropdown 3</a></li>
                    <li><a href="#">Dropdown 4</a></li>
                  </ul>
                </li>
              </ul>
              <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
          </div>
        </div>
      </header>
    `;
  
    // 將生成的 header 插入到頁面中的 body 的最上方
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  
    // 添加 active 樣式到當前頁面相對應的導航鏈接
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#navmenu a');
  
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href === currentPath) {
        link.classList.add('active');
      }
    });
  });
  