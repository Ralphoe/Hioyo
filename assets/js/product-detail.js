document.addEventListener("DOMContentLoaded", function () {
  // Fetch product and brand data from API
  fetchProducts();

  const tabLinks = document.querySelectorAll(".tab-links a");
  const tabContent = document.querySelector(".tab-content");

  if (tabLinks.length && tabContent) {
    // Tab navigation click event
    tabLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        // Get the index of the clicked tab
        const index = parseInt(this.getAttribute("data-tab"));

        // Remove active class from all links
        tabLinks.forEach((link) => link.classList.remove("active"));

        // Add active class to the clicked link
        this.classList.add("active");

        // Move tab-content to show the selected tab-pane
        const offset = -index * 100;
        tabContent.style.transform = `translateX(${offset}%)`;
      });
    });
  } else {
    console.error("Tab links or tab content element is missing.");
  }
});

function fetchProducts() {
  // fetch("https://dev-backend-host.hioyo.com/api/v1/products?per_page=&page=&filter[brand_id]=&filter[product_category_id]=&sort=-id", {
  //     method: 'GET',
  //     redirect: 'follow'
  // })
  fetch("https://dev-backend-host.hioyo.com/api/v1/products?sort=-id", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      if (result.success && result.data && result.data.data.length > 0) {
        const product = result.data.data[0];
        renderProductDetails(product);
      } else {
        console.error("Failed to fetch products: ", result);
        const errorMessage = document.querySelector("#error-message");
        if (errorMessage) {
          errorMessage.innerText = "無法載入商品，請稍後再試。";
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      const errorMessage = document.querySelector("#error-message");
      if (errorMessage) {
        errorMessage.innerText = "無法載入商品，請稍後再試。";
      }
    });
}

function renderProductDetails(product) {
  // Render brand details
  const brandList = document.querySelector("#brand-list");
  if (brandList && product.brand) {
    brandList.innerHTML = `<li class="active"><a href="#" data-brand-id="${product.brand.id}">${product.brand.name}</a></li>`;
  }
  const productName = document.querySelector("#product-name");
  const productSerial = document.querySelector("#product-serial");
  const productPrice = document.querySelector("#product-price");
  const mainImage = document.querySelector(".main-image");
  const thumbnailWrapper = document.querySelector("#thumbnail-wrapper");
  const productDescription = document.querySelector("#product-description");
  const productSpec = document.querySelector("#product-spec");

  if (
    productName &&
    productSerial &&
    productPrice &&
    mainImage &&
    thumbnailWrapper &&
    productDescription &&
    productSpec
  ) {
    productName.innerText = product.name;
    productSerial.innerText = `商品編號: ${product.id}`;
    productPrice.innerText = `建議售價｜NT$ ${product.variants[0].price}`;
    mainImage.src = product.cover[0].url;

    thumbnailWrapper.innerHTML = "";
    product.images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.url;
      img.alt = "商品圖片縮圖";
      img.classList.add("thumbnail");
      img.addEventListener("click", function () {
        mainImage.src = this.src;
      });
      thumbnailWrapper.appendChild(img);
    });

    productDescription.innerHTML = product.description;
    productSpec.innerHTML = product.variants
      .map((variant) => `<p>${variant.spec}</p>`)
      .join("");
  } else {
    console.error(
      "One or more elements for rendering product details are missing."
    );
  }
}

function renderBrandList(brands) {
  const brandList = document.querySelector("#brand-list");
  if (brandList) {
    brandList.innerHTML =
      '<li class="active"><a href="#" data-brand-id="">所有品牌</a></li>';
    brands.forEach((brand) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" data-brand-id="${brand.id}">${brand.name}</a>`;
      brandList.appendChild(li);
    });
  } else {
    console.error("Brand list element is missing.");
  }
}
