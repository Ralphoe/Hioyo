document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.querySelector(".loading-overlay"); // 修正選取器

  fetchProductDetail();

  const tabLinks = document.querySelectorAll(".tab-links a");
  const tabContent = document.querySelector(".tab-content");

  if (tabLinks.length && tabContent) {
    tabLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        const index = parseInt(this.getAttribute("data-tab"));

        tabLinks.forEach((link) => link.classList.remove("active"));

        this.classList.add("active");

        const offset = -index * 100;
        tabContent.style.transform = `translateX(${offset}%)`;
      });
    });
  } else {
    console.error("Tab links or tab content element is missing.");
  }
});

function fetchProductDetail() {
  const loadingOverlay = document.querySelector(".loading-overlay"); // 確保選取正確的元素
  if (loadingOverlay) {
    loadingOverlay.style.display = "flex"; // 顯示 loading
  }

  fetch("https://apifoxmock.com/m1/5509778-5186031-default/api/v1/product-detail", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((product) => {
      renderProductDetails(product);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      const errorMessage = document.querySelector("#error-message");
      if (errorMessage) {
        errorMessage.innerText = "無法載入商品，請稍後再試。";
      }
    })
    .finally(() => {
      if (loadingOverlay) {
        loadingOverlay.style.display = "none"; // 隱藏 loading
      }
    });
}

function renderProductDetails(product) {
  const productName = document.querySelector("#product-name");
  const productSerial = document.querySelector("#product-serial");
  const productPrice = document.querySelector("#product-price");
  const mainImage = document.querySelector(".main-image");
  const productDescription = document.querySelector("#product-description");

  if (productName && productSerial && productPrice && mainImage && productDescription) {
    productName.innerText = product.name;
    productSerial.innerText = `商品編號: ${product.id}`;
    productPrice.innerText = `建議售價｜NT$ ${product.price}`;
    mainImage.src = product.image;
    productDescription.innerHTML = product.description;
  } else {
    console.error("One or more elements for rendering product details are missing.");
  }
}

