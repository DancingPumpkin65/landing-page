document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initThemeToggle();
    initLanguageSwitcher();
    initScrollDetection();
    initScrollAnimations();
    addPlayfulAnimations();
    initNavbarTransformation();
    // Note: init3DModel is now handled in HTML via module import
});

/* ==========================
   THEME TOGGLE FUNCTIONALITY
   ========================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.theme-toggle .fa-moon');
    const sunIcon = document.querySelector('.theme-toggle .fa-sun');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', function () {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        moonIcon.style.display = isDarkMode ? 'none' : 'block';
        sunIcon.style.display = isDarkMode ? 'block' : 'none';

        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

/* =============================
   LANGUAGE SWITCHER FUNCTIONALITY
   ============================= */
function initLanguageSwitcher() {
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    const languageDisplay = document.querySelector('.language-btn span');

    languageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            languageLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const lang = this.getAttribute('data-lang').toUpperCase();
            languageDisplay.textContent = lang;

            localStorage.setItem('language', this.getAttribute('data-lang'));
        });
    });

    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedLanguageElement = document.querySelector(`.language-dropdown a[data-lang="${savedLanguage}"]`);

    if (savedLanguageElement) {
        languageLinks.forEach(l => l.classList.remove('active'));
        savedLanguageElement.classList.add('active');
        languageDisplay.textContent = savedLanguage.toUpperCase();
    }
}

/* ==============================
   SCROLL DETECTION FUNCTIONALITY
   ============================== */
function initScrollDetection() {
    const header = document.querySelector('.header');

    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==============================
   SCROLL ANIMATIONS FUNCTIONALITY
   ============================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated-heading, .feature-card, .testimonial-card');

    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect();
            if (position.top < window.innerHeight * 0.9 && position.bottom >= 0) {
                element.classList.add('in-view');
            }
        });
    }

    checkElementsInViewport();
    window.addEventListener('scroll', function () {
        window.requestAnimationFrame(checkElementsInViewport);
    });

    const languageBubbles = document.querySelectorAll('.language-bubble');
    languageBubbles.forEach((bubble, index) => {
        bubble.style.animationDelay = `${index * 0.1}s`;
    });
}

/* ==============================
   PLAYFUL ANIMATIONS FUNCTIONALITY
   ============================== */
function addPlayfulAnimations() {
    const mascotImage = document.querySelector('.mascot-image');
    if (mascotImage) {
        mascotImage.classList.add('floating');
    }

    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/* =================================
   NAVBAR TRANSFORMATION FUNCTIONALITY
   ================================= */
function initNavbarTransformation() {
    const header = document.querySelector('.header');
    const heroButton = document.querySelector('.hero .btn-primary'); // The START LEARNING button
    const navControls = document.querySelector('.nav-controls');
    const languageSwitcher = document.querySelector('.language-switcher');

    const navButton = document.createElement('a');
    navButton.href = '#signup';
    navButton.className = 'btn btn-primary nav-cta-button';
    navButton.textContent = 'START LEARNING';
    navButton.style.display = 'none';
    navControls.appendChild(navButton);

    let isNavButtonVisible = false;

    window.addEventListener('scroll', function () {
        const buttonPosition = heroButton ? heroButton.getBoundingClientRect().top : 0;
        const headerHeight = header.offsetHeight;

        if (buttonPosition < headerHeight - 30) {
            if (!isNavButtonVisible) {
                navButton.style.display = 'block';
                navButton.style.animation = 'fadeSlideIn 0.3s forwards';
                languageSwitcher.style.display = 'none';
                isNavButtonVisible = true;
            }
        } else {
            if (isNavButtonVisible) {
                navButton.style.animation = 'fadeSlideOut 0.3s forwards';

                setTimeout(() => {
                    navButton.style.display = 'none';
                }, 300);

                setTimeout(() => {
                    languageSwitcher.style.display = 'block';
                }, 300);

                isNavButtonVisible = false;
            }
        }
    });
}
