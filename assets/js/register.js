// 載入驗證碼
function loadCaptcha() {
  const captchaUrl = "https://dev-backend-host.hioyo.com/api/v1/captcha";
  fetch(captchaUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to load captcha: " + response.status);
          }
          return response.json();
      })
      .then(data => {
          console.log("Captcha data:", data);

          if (data && data.success && data.data && data.data.img && data.data.key) {
              // 更新驗證碼圖片和 key
              document.getElementById("captchaImg").src = data.data.img; // 顯示 API 回應的驗證碼圖片
              document.getElementById("captcha-key").value = data.data.key; // 存儲 key
          } else {
              console.error("Invalid captcha data structure:", data);
              throw new Error("Invalid captcha data");
          }
      })
      .catch(error => {
          console.error("發生錯誤:", error);
          alert("無法加載驗證碼，請刷新頁面再試");
      });
}

// 初始化載入驗證碼
loadCaptcha();

// 表單提交事件處理
document.getElementById("register-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // 獲取表單中的值
  const referralByNo = document.getElementById("referral_by_no").value;
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const captcha = document.getElementById("captcha").value;
  const captchaKey = document.getElementById("captcha-key").value; // 取出驗證碼 key

  // 確認密碼是否一致
  if (password !== passwordConfirm) {
      alert("密碼和確認密碼不一致");
      return;
  }

  // 確認 captcha 和 captchaKey 不為空
  if (!captcha || !captchaKey) {
      alert("驗證碼未加載，請刷新後重試");
      return;
  }

  const apiUrl = "https://dev-backend-host.hioyo.com/api/v1/register";

  // 設置請求頭
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  // 設置請求參數
  var urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("name", name);
  urlencoded.append("password", password);
  urlencoded.append("password_confirmation", passwordConfirm);
  urlencoded.append("mobile", mobile);
  urlencoded.append("captcha", captcha); // 用戶輸入的驗證碼
  urlencoded.append("key", captchaKey); // 驗證碼 key，後端需要用來校驗
  urlencoded.append("referral_by_no", referralByNo);

  // 發送請求的選項
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
  };

  // 發送註冊請求
  fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
          console.log("註冊回應:", data); // 調試用，查看回應數據

          if (data.success) {
              alert("註冊成功: " + data.message);
              window.location.href = "/login.html";
          } else {
              console.error("註冊失敗:", data); // 打印詳細的錯誤訊息
              alert("註冊失敗: " + data.message);
          }
      })
      .catch(error => {
          console.error("發生錯誤:", error);
          alert("系統錯誤，請稍後再試");
      });
});
