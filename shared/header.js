document.addEventListener("DOMContentLoaded", function () {
  // 動態插入 header
  const headerHTML = `
      <header id="header" class="header d-flex align-items-center position-relative">
        <div class="header-upper">
          <div class="container-fluid container-xl d-flex align-items-center justify-content-end">
            <button onclick="window.location.href='/login.html';" class="login-btn">登入</button>
            <button onclick="window.location.href='/register.html';" class="join-btn">加入我們</button>
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
                <a href="/member-info.html"
                  ><span>會員專區</span>
                  <i class="bi bi-chevron-down toggle-dropdown"></i
                ></a>
                <ul>
                  <li><a href="/login.html">登入</a></li>
                  <li><a href="/register.html">註冊</a></li>
                  <li><a href="#">購物車</a></li>
                  <li><a href="/apply-advisor.html">申請成為社群顧問</a></li>
                  <li><a href="/member-change.html">修改密碼</a></li>
                  <li><a href="/member-order.html">訂單查詢</a></li>
                  <li class="dropdown">
                    <a href="#"
                      ><span>獎勵查詢</span>
                      <i class="bi bi-chevron-down toggle-dropdown"></i
                    ></a>
                    <ul>
                      <li><a href="/member-rule.html">獎勵規則</a></li>
                      <li><a href="/member-organize.html">組織節點</a></li>
                    </ul>
                  </li>
                  <li><a href="#">登出 </a></li>
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

  // 去掉 currentPath 中的 #
  const currentPath = window.location.pathname + window.location.search;
  const navLinks = document.querySelectorAll("#navmenu a");

  // 判斷是否為會員相關頁面
  const isMemberPage = currentPath.startsWith("/member-");
  let memberActiveAdded = false;

  navLinks.forEach((link) => {
    // 獲取href
    let href = link.getAttribute("href");

    // 如果 href 包含 hash (#)，去掉 hash 部分
    if (href && href.includes("#")) {
      href = href.split("#")[0];
    }
    // 確保 href 和 currentPath 格式一致
    if (href && !href.startsWith("/")) {
      href = "/" + href; // 為 href 加上前導斜線
    }

    // console.log(href);
    // console.log(currentPath);
    if (href && href === currentPath) {
      link.classList.add("active");
    }

    // 如果是會員相關頁面，且尚未新增 active 樣式到會員專區
    if (isMemberPage && !memberActiveAdded) {
      const memberAreaLink = document.querySelector(".navmenu .dropdown > a");
      if (memberAreaLink) {
        memberAreaLink.classList.add("active");
        memberActiveAdded = true; // 避免重複處理
      }
    }
  });

  // 綁定購物車按鈕事件
  const toggleCartButton = document.querySelector(".shopping-cart-btn");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCartBtn = document.getElementById("closeCartBtn");

  if (toggleCartButton && cartSidebar && closeCartBtn) {
    // 打開購物車側邊欄
    toggleCartButton.addEventListener("click", function () {
      cartSidebar.classList.add("cart-sidebar-open");
    });

    // 關閉購物車側邊欄
    closeCartBtn.addEventListener("click", function () {
      cartSidebar.classList.remove("cart-sidebar-open");
    });

    // 點擊側邊欄外部時關閉購物車側邊欄
    document.addEventListener("click", function (event) {
      if (
        !cartSidebar.contains(event.target) &&
        !toggleCartButton.contains(event.target)
      ) {
        cartSidebar.classList.remove("cart-sidebar-open");
      }
    });
  }
});
