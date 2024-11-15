document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");
    const form = document.getElementById("changePasswordForm");
  
    // 切換密碼顯示或隱藏
    togglePasswordIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        const targetInput = document.getElementById(icon.dataset.target);
        if (targetInput.type === "password") {
          targetInput.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          targetInput.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });
    });
  
    // 表單提交時檢查條件
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const oldPassword = document.getElementById("oldPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      if (oldPassword === newPassword) {
        alert("新密碼不能與舊密碼相同！");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert("新密碼與確認密碼不相符！");
        return;
      }
  
      // 成功通過檢查後的處理邏輯
      alert("密碼修改成功！");
      form.reset();
    });
  });