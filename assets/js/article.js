document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('.sidebar ul li');
  
    sidebarItems.forEach((item) => {
      item.addEventListener('click', function () {
        sidebarItems.forEach((el) => el.classList.remove('active'));
        this.classList.add('active');
        // You can add more logic here if you want to dynamically load content
      });
    });
  
    const prevArticle = document.querySelector('.prev-article');
    const nextArticle = document.querySelector('.next-article');
  
    prevArticle.addEventListener('click', (e) => {
      e.preventDefault();
      // Logic to navigate to the previous article
    });
  
    nextArticle.addEventListener('click', (e) => {
      e.preventDefault();
      // Logic to navigate to the next article
    });
  });