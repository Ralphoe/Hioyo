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
    const imgPath = `${window.location.origin}/assets/img/sample_img.jpg`;

    productsToRender.forEach((product) => {
      // Format the price to currency format
      const formattedPrice = Number(
        product.price.replace("NT$", "")
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "TWD",
        minimumFractionDigits: 0,
      });

      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = ` 
        <a href="./product-details.html" class="product-link">
          <div class="product-image" style="background-color: ${product.color};">
              <img src="${imgPath}" alt="商品圖片" class="placeholder-image">
          </div>
        </a>
          <div class="product-info">
           <a href="./product-details.html" class="product-link">
              <p>${product.name}</p>
            </a>
              <span>建議售價｜ ${formattedPrice}</span>
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

      // Remove 'active' class from all page links
      pageLinks.forEach((link) => link.classList.remove("active"));

      // Add 'active' class to the clicked page link
      this.classList.add("active");

      // Get the page number from data attribute and render the products
      const page = parseInt(this.getAttribute("data-page"));
      renderProducts(page);
    });
  });

  // Handle previous and next buttons
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  prevButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Find the current active page
    let currentPage = document.querySelector(".page-link.active");
    let currentPageNumber = parseInt(currentPage.getAttribute("data-page"));

    // If it's not the first page, move to the previous page
    if (currentPageNumber > 1) {
      currentPageNumber--;

      // Update the active page link
      pageLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`.page-link[data-page="${currentPageNumber}"]`)
        .classList.add("active");

      // Render the products for the new page
      renderProducts(currentPageNumber);
    }
  });

  nextButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Find the current active page
    let currentPage = document.querySelector(".page-link.active");
    let currentPageNumber = parseInt(currentPage.getAttribute("data-page"));
    const totalPages = pageLinks.length;

    // If it's not the last page, move to the next page
    if (currentPageNumber < totalPages) {
      currentPageNumber++;

      // Update the active page link
      pageLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`.page-link[data-page="${currentPageNumber}"]`)
        .classList.add("active");

      // Render the products for the new page
      renderProducts(currentPageNumber);
    }
  });

  // Render the first page initially
  renderProducts(1);
});
