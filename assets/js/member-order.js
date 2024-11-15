document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("orderQueryForm");
  const orderResults = document.getElementById("orderResults");
  const orderResultsBody = document.getElementById("orderResultsBody");
  const searchButton = document.getElementById("searchButton");
  const searchOrder = document.getElementById("searchOrder");
  const filterTabs = document.querySelectorAll(".filter-tabs-list li");
  let currentStatus = "all";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    fetchOrders(startDate, endDate, currentStatus, searchOrder.value);
  });

  searchButton.addEventListener("click", function () {
    fetchOrders(null, null, currentStatus, searchOrder.value);
  });

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      currentStatus = this.getAttribute("data-status");
      fetchOrders(null, null, currentStatus, searchOrder.value);
    });
  });

  function fetchOrders(startDate, endDate, status, keyword) {
    // 模擬查詢結果
    const dummyOrders = [
      {
        date: "2024/10/01",
        id: "ORD123456",
        name: "王尖尖",
        status: "待付款",
        payment: "信用卡",
        amount: "$1,200",
      },
      {
        date: "2024/09/25",
        id: "ORD123457",
        name: "王尖尖",
        status: "已出貨",
        payment: "銀行轉帳",
        amount: "$3,400",
      },
      {
        date: "2024/09/15",
        id: "ORD123458",
        name: "王尖尖",
        status: "不成立",
        payment: "貨到付款",
        amount: "$500",
      },
    ];

    // 清空原本的結果
    orderResultsBody.innerHTML = "";

    // 篩選模擬的結果
    const filteredOrders = dummyOrders.filter((order) => {
      const matchesStatus = status === "all" || order.status === status;
      const matchesKeyword =
        keyword === "" ||
        order.id.includes(keyword) ||
        order.name.includes(keyword);
      return matchesStatus && matchesKeyword;
    });

    // 加入篩選後的結果
    filteredOrders.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${order.date}</td>
          <td>${order.id}</td>
          <td>${order.name}</td>
          <td>${order.status}</td>
          <td>${order.payment}</td>
          <td>${order.amount}</td>
        `;
      orderResultsBody.appendChild(row);
    });

    // 顯示結果
    orderResults.style.display = "block";
  }
});
