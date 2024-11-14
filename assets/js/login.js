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
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // 獲取表單中的值
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const captcha = document.getElementById("captcha").value;
    const captchaKey = document.getElementById("captcha-key").value; // 取出驗證碼 key

    // 檢查是否填寫了驗證碼和 captchaKey
    if (!captcha || !captchaKey) {
        alert("驗證碼未加載，請刷新頁面後重試");
        return;
    }

    // 更新為實際 API URL
    const apiUrl = "https://dev-backend-host.hioyo.com/api/v1/login";

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var urlencoded = new URLSearchParams();
    urlencoded.append("identifier", username);
    urlencoded.append("password", password);
    urlencoded.append("captcha", captcha); // 添加 captcha 到請求中
    urlencoded.append("key", captchaKey); // 添加 captcha key 到請求中

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    // 發送登入請求
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("登入回應:", data); // 調試用，查看回應數據

            if (data.success) {
                alert("登入成功");
                // 儲存 access_token
                localStorage.setItem('token', data.data.access_token);
                // 可以重定向到會員區域
                window.location.href = "/member-info";
            } else {
                console.error("登入失敗:", data); // 打印詳細的錯誤訊息
                alert("登入失敗: " + data.message);
            }
        })
        .catch(error => {
            console.error("發生錯誤:", error);
            alert("系統錯誤，請稍後再試。錯誤碼: " + error.message);
        });
});

// 登出功能
function logout() {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'), // 獲取並使用儲存的 Bearer Token
            'Accept': 'application/json'
        },
        redirect: 'follow'
    };

    fetch("/v1/logout", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert("登出成功");
                // 清除 token 並重定向到登入頁面
                localStorage.removeItem('token');
                window.location.href = "/login";
            } else {
                alert("登出失敗: " + result.message);
            }
        })
        .catch(error => {
            console.error('發生錯誤:', error);
            alert("系統錯誤，請稍後再試。錯誤碼: " + error.message);
        });
}

// 綁定登出按鈕事件
document.getElementById("logout-button")?.addEventListener("click", logout);
