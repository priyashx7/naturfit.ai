document.addEventListener("DOMContentLoaded", function() {
    
    /* to add scrolling functionlaity while tapping the navigating words */ 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
            behavior: 'smooth'
            });
        }
        });
    });
    
    /* for adding the hamburger fuctionality of toggling down while clicking onto it */
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    
    /* to add fuctionality in navigation bar */     
    var navbar = document.querySelector('.navbar');
    var lastScrollTop = 0; // Variable to keep track of the last scroll position
    var scrollThreshold = 100; // Adjust as needed for changing color

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Hide/Show navbar on scroll direction
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling

        // Change navbar color based on scroll position
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    var rows = document.querySelectorAll('.image-row');

    rows.forEach(function(row) {
        var imageSet = row.querySelector('.image-set');
        var images = Array.from(imageSet.querySelectorAll('img'));
        var totalWidth = 0;
        images.forEach(img => totalWidth += img.offsetWidth + parseInt(window.getComputedStyle(img).marginRight, 10));
        var currentPosition = 0;
        var speed = 1; // Adjust speed as needed

        function animate() {
            currentPosition -= speed;
            if (currentPosition <= -images[0].offsetWidth) {
                // Move the first image to the end to create a seamless loop
                var firstImage = images.shift();
                imageSet.appendChild(firstImage);
                currentPosition += firstImage.offsetWidth;
                images.push(firstImage);
            }

            imageSet.style.transform = 'translateX(' + currentPosition + 'px)';
            requestAnimationFrame(animate);
        }

        animate();
    });

    // Once the images are set up, hide the loading overlay
    document.getElementById('loading-overlay').style.display = 'none';
});
