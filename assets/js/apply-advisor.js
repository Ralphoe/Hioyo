document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".submit-application-btn");
  
    if (submitBtn) {
      submitBtn.addEventListener("click", function () {
        alert("已成功提交申請，我們將在七個工作日內審核您的資料。");
      });
    }
  });