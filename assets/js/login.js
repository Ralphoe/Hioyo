// 載入驗證碼
function loadCaptcha() {
    const captchaImg = document.getElementById("captchaImg");
    const captchaKey = document.getElementById("captcha-key");
  
    // 模擬驗證碼數據
    const mockCaptchaBase64 =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAADra60AAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZElEQVR4nO2bS0sDQRBEV9iCpBAqgUagWqBQqBSqBCoFKgUagWqBSqBCoFKgUqgeE2umvZl1lM1jLZ+d1FzXj4/MxPqilCEjTGkhRIRAZ7AB67nXe9EXdcwgDSVSB/S8B0VAAAgEAB1ktj+V0no5EVaD0gSIdcCnkO7g6Sw7AlJjtwGHQk1koUgDZAP3dZQSmB5TAHvDcMG1kJ0CGiX0Ygk4FbAlS0ddjHK4DkX3b0GIPQXWBBp6abIHeghdHmjj0gBw3WkQiGzEhpkf0/hJt7O4t87xgGSa+6QhZbmzE7YJ0FhpXc3MG15j1BFpXx2XhM4b1J0BEo/gNTDYi71K0O8AfjggUle1LC4C0nkExXh/FAj6e4I6WPcAPBiJgQ2rV5QnSh/ovYRkhWikIAVM5nAT2F0rIJZ+CVRWZ3AO0lSYZ7d4E9Ad9JDncaG5RGUvADYKI2wwi82kYIj2f3+AVJS/OUBI9a1qAJCl3BlhOnSB2rKCVmLgmwEdY1JR0wOcTtJ+jkgwLXdhg16dJ6AGAKBrdYXYgUMArAwAbLdPN4xLBHhkWSNk6eWm3dt2n9vb2/6zxP4q5NEnZc9EIpqDcoWjepF/UZFTDd1CFqijCKKb2uYIPgCoBhq0BpuuQP/RvNDYCBqlb68l/jj/X3zc7Z0XyHgD0MDCz3e9I15qBZolFf+jB3P0Z5XzEYEOoAKgSAmwM+1rId5LTAAAAAElFTkSuQmCC";
    const mockKey = "mock-key";
  
    if (captchaImg && captchaKey) {
      captchaImg.src = mockCaptchaBase64; // 設置 Base64 圖片
      captchaKey.value = mockKey; // 模擬驗證碼 key
    } else {
      console.error("Captcha elements not found in DOM.");
    }
  }
  
  // 初始化驗證碼
  document.addEventListener("DOMContentLoaded", loadCaptcha);
  
  // 表單提交事件處理
  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const captcha = document.getElementById("captcha").value;
    const captchaKey = document.getElementById("captcha-key").value;
  
    // 驗證驗證碼
    if (captcha !== "1234" || captchaKey !== "mock-key") {
      alert("驗證碼錯誤");
      return;
    }
  
    // 驗證用戶
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === username && user.password === password);
  
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("登入成功！");
      window.location.href = "member-info.html";
    } else {
      alert("帳號或密碼錯誤");
    }
  });
  
  // 登出功能
  document.getElementById("logout-button")?.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    alert("已登出");
    window.location.href = "login.html";
  });
  