document.addEventListener("DOMContentLoaded", function () {
  const productsPerPage = 9;
  const totalProducts = 18;
  const productGrid = document.getElementById("productGrid");
  const pageLinks = document.querySelectorAll(".page-link");

  // Generate mock product data
  const products = Array.from({ length: totalProducts }, (_, i) => ({
    name: `[植物硒系列] - 產品 ${i + 1}`,
    price: `NT$${2980 - (i % 3) * 500}`,
    color: ["#e4a94a", "#d9534f", "#5bc0de"][i % 3],
  }));

  // Function to render products
  function renderProducts(page) {
    productGrid.innerHTML = "";
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToRender = products.slice(start, end);

    productsToRender.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = ` 
            <div class="product-image" style="background-color: ${product.color};">
                    <img src="#" alt="商品圖像" class="placeholder-image">
                </div>
                <div class="product-info">
                    <p>${product.name}</p>
                    <span>建議售價｜ ${product.price}</span>
                    <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                </div>
            `;
      productGrid.appendChild(productCard);
    });
  }

  // Add event listeners for pagination
  pageLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = parseInt(this.getAttribute("data-page"));
      renderProducts(page);
    });
  });

  // Render the first page initially
  renderProducts(1);
});
