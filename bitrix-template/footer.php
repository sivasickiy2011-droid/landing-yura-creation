<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="8" cy="8" r="3" fill="white"/>
                                <circle cx="16" cy="8" r="3" fill="white"/>
                                <circle cx="12" cy="16" r="3" fill="white"/>
                            </svg>
                        </div>
                        <span class="font-bold text-lg">Битрикс24</span>
                    </div>
                    <p class="text-gray-400 text-sm">
                        Корпоративный портал и CRM для автоматизации вашего бизнеса
                    </p>
                </div>

                <?php
                $APPLICATION->IncludeComponent(
                    "bitrix:menu",
                    "footer_menu",
                    array(
                        "ROOT_MENU_TYPE" => "bottom",
                        "MAX_LEVEL" => "1",
                        "USE_EXT" => "N",
                        "MENU_CACHE_TYPE" => "A",
                        "MENU_CACHE_TIME" => "3600"
                    ),
                    false
                );
                ?>
            </div>

            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-400 text-sm">
                    © <?= date('Y') ?> Битрикс24. Все права защищены.
                </p>
                <div class="flex gap-6">
                    <a href="/privacy/" class="text-gray-400 hover:text-white text-sm transition-colors">
                        Политика конфиденциальности
                    </a>
                    <a href="/terms/" class="text-gray-400 hover:text-white text-sm transition-colors">
                        Условия использования
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button id="scroll-to-top" class="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 opacity-0 translate-y-16 pointer-events-none" aria-label="Прокрутить наверх">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    </button>

    <!-- Cookie Consent (если нужен) -->
    <div id="cookie-consent" class="hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
        <div class="max-w-[1460px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-sm">
                Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с 
                <a href="/privacy/" class="underline">политикой конфиденциальности</a>.
            </p>
            <button id="cookie-accept" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                Принять
            </button>
        </div>
    </div>

    <script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('opacity-0', 'translate-y-16', 'pointer-events-none');
        } else {
            scrollBtn.classList.add('opacity-0', 'translate-y-16', 'pointer-events-none');
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Cookie consent
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.classList.remove('hidden');
    }
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.classList.add('hidden');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    </script>
</body>
</html>