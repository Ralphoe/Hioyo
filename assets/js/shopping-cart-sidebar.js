document.addEventListener("DOMContentLoaded", function () {
  const toggleCartButton = document.querySelector(".shopping-cart-btn"); // 確保這裡的 class 名稱與 HTML 一致
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCartBtn = document.getElementById("closeCartBtn");

  // Open Cart Sidebar
  toggleCartButton.addEventListener("click", function () {
    cartSidebar.classList.add("cart-sidebar-open");
  });

  // Close Cart Sidebar
  closeCartBtn.addEventListener("click", function () {
    cartSidebar.classList.remove("cart-sidebar-open");
  });

  // Close Cart Sidebar when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !cartSidebar.contains(event.target) &&
      !toggleCartButton.contains(event.target)
    ) {
      cartSidebar.classList.remove("cart-sidebar-open");
    }
  });
});
