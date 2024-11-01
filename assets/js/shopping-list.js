document.addEventListener('DOMContentLoaded', function () {
    const couponSelect = document.getElementById('coupon');
    const totalAmountDiv = document.querySelector('.total-amount');

    couponSelect.addEventListener('change', function () {
        let totalAmount = 7509; // Example base total amount
        if (couponSelect.value === '100') {
            totalAmount -= 100;
        }
        totalAmountDiv.textContent = `$ ${totalAmount}`;
    });
});