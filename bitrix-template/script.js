/**
 * Битрикс24 Партнерский Лендинг - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Billing period toggle
    initBillingToggle();
    
    // Scroll animations
    initScrollAnimations();
});

/**
 * Переключение периода оплаты (месяц/год)
 */
function initBillingToggle() {
    const toggleButtons = document.querySelectorAll('.billing-toggle');
    const priceCards = document.querySelectorAll('[data-price-card]');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            // Обновить активное состояние кнопок
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Обновить цены в карточках
            priceCards.forEach(card => {
                const monthlyPrice = card.getAttribute('data-price-month');
                const yearlyPrice = card.getAttribute('data-price-year');
                const priceElement = card.querySelector('[data-price]');
                
                if (priceElement) {
                    priceElement.textContent = period === 'month' ? monthlyPrice : yearlyPrice;
                }
            });
        });
    });
}

/**
 * Анимации при скролле
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдать за элементами с классом .scroll-animate
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Slider для проблем (Hero section)
 */
if (document.querySelector('.problems-slider')) {
    let currentProblem = 0;
    const problems = document.querySelectorAll('.problem-item');
    const totalProblems = problems.length;
    
    function showProblem(index) {
        problems.forEach((problem, i) => {
            if (i === index) {
                problem.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                problem.classList.add('opacity-100', 'scale-100');
            } else {
                problem.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                problem.classList.remove('opacity-100', 'scale-100');
            }
        });
    }
    
    setInterval(() => {
        currentProblem = (currentProblem + 1) % totalProblems;
        showProblem(currentProblem);
    }, 5000);
    
    showProblem(0);
}

/**
 * Модальное окно для тарифов
 */
function openTariffModal(tariffName, billingPeriod) {
    // Здесь можно открыть модальное окно или веб-форму Битрикс
    console.log('Opening tariff modal for:', tariffName, billingPeriod);
}

/**
 * Слайдер отзывов
 */
if (document.querySelector('.reviews-slider')) {
    let currentReview = 0;
    const reviewsContainer = document.querySelector('.reviews-slider-container');
    const reviews = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.reviews-prev');
    const nextBtn = document.querySelector('.reviews-next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentReview > 0) {
                currentReview--;
                updateReviewsSlider();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentReview < reviews.length - 1) {
                currentReview++;
                updateReviewsSlider();
            }
        });
    }
    
    function updateReviewsSlider() {
        const offset = currentReview * -100;
        reviewsContainer.style.transform = `translateX(${offset}%)`;
    }
}
