document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("請先登入");
    window.location.href = "login.html";
    return;
  }

  // 顯示會員資料
  const fields = {
    memberNumber: currentUser.referralByNo || "暫無資料",
    memberName: currentUser.name || "暫無資料",
    memberEmail: currentUser.email || "暫無資料",
    memberMobile: currentUser.mobile || "暫無資料",
  };

  Object.entries(fields).forEach(([fieldId, value]) => {
    const fieldElement = document.getElementById(fieldId);
    if (fieldElement) fieldElement.textContent = value;
  });

  // 登出功能
  document.getElementById("logout-button")?.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    alert("已登出");
    window.location.href = "login.html";
  });
});
