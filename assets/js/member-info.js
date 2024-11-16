document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-member ul li");
  const loadingIndicator = document.getElementById("loading");
  const API_URL = "https://dev-backend-host.hioyo.com/api/v1/me";
  const token = localStorage.getItem("token");

  if (!token) {
    alert("請先登入");
    window.location.href = "/login.html";
    return;
  }

  // API 請求配置
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
    redirect: "follow",
  };

  // 初次載入會員資料
  fetchMemberInfo();

  function fetchMemberInfo() {
    clearMemberInfo(); // 清空資料
    showLoadingIndicator(true); // 顯示載入指示器

    retryFetch(API_URL, requestOptions, 3)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError)
      .finally(() => showLoadingIndicator(false)); // 請求結束後隱藏載入指示器
  }

  function retryFetch(url, options, retries) {
    return fetch(url, options).catch((err) => {
      if (retries === 0) throw err;
      return retryFetch(url, options, retries - 1);
    });
  }

  function handleResponse(response) {
    if (!response.ok) {
      if (response.status === 401) {
        console.log("認證失敗，請重新登入");
        throw new Error("請先登入");
      } else if (response.status === 0) {
        throw new Error("CORS 錯誤：無法連接到伺服器");
      }
      throw new Error(`網路回應出現問題，狀態碼：${response.status}`);
    }
    return response.json();
  }

  function handleData(result) {
    if (result.success && result.data) {
      updateMemberInfo(result.data);
    } else {
      throw new Error(result.message || "資料格式不正確");
    }
  }

  function handleError(error) {
    console.error("發生錯誤:", error);
    let errorMessage = error.message.includes("CORS")
      ? "無法連接到伺服器，請確認網路連線或聯繫系統管理員"
      : error.message.includes("請先登入")
      ? "請先登入系統"
      : "載入資料時發生錯誤";
    showErrorMessage(errorMessage);
    clearMemberInfo();
  }

  function updateMemberInfo(data) {
    const fields = {
      memberNumber: "no",
      memberName: "name",
      memberEmail: "email",
      memberAddress: "address",
      homeTel: "home_tel",
      companyTel: "company_tel",
      memberMobile: "mobile",
    };

    Object.entries(fields).forEach(([elementId, dataKey]) => {
      const element = document.getElementById(elementId);
      if (element) element.textContent = data[dataKey] || "暫無資料";
    });
  }

  function clearMemberInfo() {
    [
      "memberNumber",
      "memberName",
      "memberEmail",
      "memberAddress",
      "homeTel",
      "companyTel",
      "memberMobile",
    ].forEach((fieldId) => {
      const element = document.getElementById(fieldId);
      if (element) element.textContent = "暫無資料";
    });
  }

  function showLoadingIndicator(show) {
    if (loadingIndicator)
      loadingIndicator.style.display = show ? "block" : "none";
  }

  function showErrorMessage(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.cssText =
      "color: red; padding: 10px; margin: 10px 0; border: 1px solid red; border-radius: 4px;";
    errorDiv.textContent = message;

    const form = document.getElementById("accountForm");
    if (form) {
      form.insertBefore(errorDiv, form.firstChild);
      setTimeout(() => errorDiv.remove(), 5000); // 5秒後自動移除錯誤訊息
    }
  }

  // 側邊欄選項點擊事件
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      const link = this.querySelector("a");
      const href = link ? link.getAttribute("href") : null;

      // 記錄當前的 scroll 位置
      sessionStorage.setItem("scrollPosition", window.scrollY);

      // 展開或折疊子選單的邏輯
      if (item.classList.contains("reward-menu")) {
        e.preventDefault(); // 阻止默認行為
        const submenu = item.querySelector(".reward-submenu");
        submenu.classList.toggle("expanded");
      } else if (href) {
        // 如果 href 存在且不是子選單的話，正常跳轉
        window.location.href = href;
      }

      // 設置 .active 樣式
      sidebarItems.forEach((el) =>
        el.querySelector("a").classList.remove("active")
      );
      if (link) link.classList.add("active");
    });
  });

  // 當頁面加載時，恢復 scroll 位置和判斷是否需要展開子選單
  const savedPosition = sessionStorage.getItem("scrollPosition");
  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition, 10));
    sessionStorage.removeItem("scrollPosition"); // 加載完畢後清除
  }

  // 檢查當前頁面是否應展開 reward-submenu
  const currentPath = window.location.pathname;
  if (
    currentPath === "/member-rule.html" ||
    currentPath === "/member-organize.html"
  ) {
    const rewardMenu = document.querySelector(".reward-menu .reward-submenu");
    if (rewardMenu) {
      rewardMenu.classList.add("expanded");
    }
  }
});
