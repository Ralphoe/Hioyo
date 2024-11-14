document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar-member ul li');
    const loadingIndicator = document.getElementById('loading');
    const API_URL = 'https://dev-backend-host.hioyo.com/api/v1/me';
    const token = localStorage.getItem('token');

    // API 請求配置
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            // 'Authorization': `Bearer 2f68dbbf-519d-4f01-9636-e2421b68f379`
        },
        credentials: 'same-origin',
        redirect: 'follow'
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

    // 添加重試機制的 fetch 函數
    function retryFetch(url, options, retries) {
        return fetch(url, options)
            .catch(err => {
                if (retries === 0) throw err;
                return retryFetch(url, options, retries - 1);
            });
    }

    // 處理 API 回應
    function handleResponse(response) {
        if (!response.ok) {
            if (response.status === 401) {
                console.log('認證失敗，請重新登入');
                throw new Error('請先登入');
            } else if (response.status === 0) {
                throw new Error('CORS 錯誤：無法連接到伺服器');
            }
            throw new Error(`網路回應出現問題，狀態碼：${response.status}`);
        }
        return response.json();
    }

    // 處理資料
    function handleData(result) {
        if (result.success && result.data) {
            updateMemberInfo(result.data);
        } else {
            throw new Error(result.message || '資料格式不正確');
        }
    }

    // 處理錯誤
    function handleError(error) {
        console.error('發生錯誤:', error);
        let errorMessage = error.message.includes('CORS')
            ? '無法連接到伺服器，請確認網路連線或聯繫系統管理員'
            : error.message.includes('請先登入')
            ? '請先登入系統'
            : '載入資料時發生錯誤';
        showErrorMessage(errorMessage);
        clearMemberInfo();
    }

    // 更新會員資訊
    function updateMemberInfo(data) {
        const fields = {
            'memberNumber': 'no',
            'memberName': 'name',
            'memberEmail': 'email',
            'memberAddress': 'address',
            'homeTel': 'home_tel',
            'companyTel': 'company_tel',
            'memberMobile': 'mobile'
        };

        Object.entries(fields).forEach(([elementId, dataKey]) => {
            const element = document.getElementById(elementId);
            if (element) element.textContent = data[dataKey] || '暫無資料';
        });
    }

    // 清空會員資訊
    function clearMemberInfo() {
        ['memberNumber', 'memberName', 'memberEmail', 'memberAddress', 'homeTel', 'companyTel', 'memberMobile']
            .forEach(fieldId => {
                const element = document.getElementById(fieldId);
                if (element) element.textContent = '暫無資料';
            });
    }

    // 顯示或隱藏載入指示器
    function showLoadingIndicator(show) {
        if (loadingIndicator) loadingIndicator.style.display = show ? 'block' : 'none';
    }

    // 顯示錯誤訊息
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: red; padding: 10px; margin: 10px 0; border: 1px solid red; border-radius: 4px;';
        errorDiv.textContent = message;

        const form = document.getElementById('accountForm');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
            setTimeout(() => errorDiv.remove(), 5000); // 5秒後自動移除錯誤訊息
        }
    }

    // 側邊欄選項點擊事件
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarItems.forEach(el => el.querySelector('a').classList.remove('active'));
            this.querySelector('a').classList.add('active');
            const href = this.querySelector('a').getAttribute('href');
            handleMenuClick(href);
        });
    });

    // 處理選單點擊
    function handleMenuClick(href) {
        if (href === '#') fetchMemberInfo();
        else console.log('未處理的選單項目:', href);
    }
});
