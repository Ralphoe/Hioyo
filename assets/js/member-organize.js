document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const contentSlider = document.querySelector(".member-slider");
  
    tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
  
        // 移動到對應區塊
        contentSlider.style.transform = `translateX(-${index * 50}%)`;
      });
    });
  
    // 列表
    function toggleSubList(header) {
      const subList = header.nextElementSibling.nextElementSibling;
      const toggleIcon = header.querySelector(".toggle-icon");
  
      if (subList && subList.classList.contains("hidden")) {
        subList.classList.remove("hidden");
        toggleIcon.innerHTML = '<i class="fas fa-minus"></i>'; // 切換為 Font Awesome 的「減號」
      } else if (subList) {
        subList.classList.add("hidden");
        toggleIcon.innerHTML = '<i class="fas fa-plus"></i>'; // 切換為 Font Awesome 的「加號」
      }
    }
  
    // 將函數設置為全域可用
    window.toggleSubList = toggleSubList;
  });
  
