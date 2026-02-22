// ===== MAIN JAVASCRIPT FILE =====
// This file contains all the interactive functionality for the personal website

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', updateNavbarBackground);
    updateNavbarBackground(); // Initial call
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--secondary-color)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            
            // In a real application, you would send the data to a server here
            // Example using fetch:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues)
            })
            .then(response => response.json())
            .then(data => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showNotification('Something went wrong. Please try again.', 'error');
            });
            */
        });
    }
    
    // ===== SKILL BARS ANIMATION =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Animate skill bars when skills section comes into view
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // ===== PORTFOLIO ITEM HOVER EFFECTS =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Add close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        // Add close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
        
        // Add keyframes for animation
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ===== SCROLL PROGRESS INDICATOR =====
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 9998;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        }
        
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();
    }
    
    createScrollProgress();
    
    // ===== THEME TOGGLE (OPTIONAL) =====
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            z-index: 999;
            box-shadow: var(--shadow-md);
            transition: all 0.3s ease;
        `;
        
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('light-theme');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        });
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        document.body.appendChild(themeToggle);
        
        // Add light theme styles
        const style = document.createElement('style');
        style.textContent = `
            .light-theme {
                --darker-color: #F5F5F7;
                --dark-color: #FFFFFF;
                --light-color: #1A1A2E;
                --gray-color: #666666;
                background-color: var(--darker-color);
                color: var(--light-color);
            }
            
            .light-theme .navbar {
                background: rgba(255, 255, 255, 0.95);
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .light-theme .logo {
                color: var(--light-color);
            }
            
            .light-theme .nav-links a {
                color: var(--light-color);
            }
            
            .light-theme .portfolio-item,
            .light-theme .skill-category,
            .light-theme .contact-form {
                background: rgba(0, 0, 0, 0.05);
                border-color: rgba(0, 0, 0, 0.1);
            }
            
            .light-theme .form-group input,
            .light-theme .form-group textarea {
                background: rgba(0, 0, 0, 0.05);
                border-color: rgba(0, 0, 0, 0.1);
                color: var(--light-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Uncomment to enable theme toggle
    // createThemeToggle();
    
    // ===== INITIALIZE ANIMATIONS =====
    // Add subtle animation to hero elements
    const heroElements = document.querySelectorAll('.hero-title span, .hero-subtitle, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateNavbarBackground, 100);
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    });
    
    console.log('Personal website initialized successfully!');
});