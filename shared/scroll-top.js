document.addEventListener("DOMContentLoaded", function () {
    const scrollTopHTML = `
      <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center">
        <i class="bi bi-arrow-up-short"></i>
      </a>
    `;
  
    // 將生成的 scroll-top 插入到頁面中的 body 的底部
    document.body.insertAdjacentHTML("beforeend", scrollTopHTML);
  
    const scrollTopButton = document.getElementById("scroll-top");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollTopButton.classList.add("active");
      } else {
        scrollTopButton.classList.remove("active");
      }
    });
  
    scrollTopButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  