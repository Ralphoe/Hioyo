document.addEventListener("DOMContentLoaded", function () {
    const placeholderHTML = `
      <div id="preloader">
        <div class="loading-spinner"></div>
      </div>
    `;
  
    // 將生成的 placeholder 插入到頁面中的 body 的最上方
    document.body.insertAdjacentHTML("afterbegin", placeholderHTML);
  
    // 當頁面加載完成後，隱藏 placeholder
    window.addEventListener("load", function () {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.display = "none";
      }
    });
  });
  