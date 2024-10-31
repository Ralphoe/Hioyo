document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    const tabLinks = document.querySelectorAll('.tab-links a');
    const tabContent = document.querySelector('.tab-content');

    // Thumbnail click event to change main image
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });

    // Tab navigation click event
    tabLinks.forEach((link) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Get the index of the clicked tab
            const index = parseInt(this.getAttribute('data-tab'));

            // Remove active class from all links
            tabLinks.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');

            // Move tab-content to show the selected tab-pane
            const offset = -index * 100;
            tabContent.style.transform = `translateX(${offset}%)`;
        });
    });
});