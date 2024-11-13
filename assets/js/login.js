document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const captcha = document.getElementById("captcha").value;

    if (username && password && captcha) {
        // 更新為實際API URL：
        const apiUrl = "http://150.230.105.85/api/v1/login";

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var urlencoded = new URLSearchParams();
        urlencoded.append("identifier", username);
        urlencoded.append("password", password);
        urlencoded.append("captcha", captcha); // 添加 captcha 到請求中

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
                alert("登入成功");
                // 儲存 access_token
                localStorage.setItem('token', data.data.access_token);
                // 可以重定向到會員區域
                window.location.href = "/member-dashboard";
            } else {
                alert("登入失敗: " + data.message);
            }
        })
        .catch(error => {
            console.error("發生錯誤:", error);
            alert("系統錯誤，請稍後再試。錯誤碼: " + error.message);
        });
    } else {
        alert("請填寫所有欄位");
    }
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