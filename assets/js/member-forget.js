document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const captcha = document.getElementById('captcha').value;

    fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            captcha: captcha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('驗證碼已發送至您的電子郵件。');
        } else {
            alert('發送失敗，請檢查輸入資料。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// 刷新驗證碼按鈕事件
document.getElementById('refreshCaptcha').addEventListener('click', function () {
    // 刷新驗證碼圖片的邏輯
    document.querySelector('.captcha-container img').src = "/captcha?" + new Date().getTime();
});