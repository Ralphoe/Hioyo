document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const captcha = document.getElementById("captcha").value;
  
    if (password !== passwordConfirm) {
      alert("密碼和確認密碼不一致");
      return;
    }
  
    const apiUrl = "https://dev-backend-host.hioyo.com/api/v1/register";
  
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("name", username);
    urlencoded.append("password", password);
    urlencoded.append("password_confirmation", passwordConfirm);
    urlencoded.append("mobile", mobile);
    urlencoded.append("captcha", captcha);
    urlencoded.append("referral_by_no", ""); // 根據需要填寫推薦碼
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("註冊成功: " + data.message);
          window.location.href = "/login";
        } else {
          alert("註冊失敗: " + data.message);
        }
      })
      .catch(error => {
        console.error("發生錯誤:", error);
        alert("系統錯誤，請稍後再試");
      });
  });
  