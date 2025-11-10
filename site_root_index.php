<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Главная страница");
?>

<!-- Hero Section -->
<section class="relative pt-32 md:pt-48 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div class="absolute inset-0 z-0 opacity-40">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="max-w-[1460px] mx-auto relative z-10 w-full">
        <div class="text-center mb-6 md:mb-8 animate-fade-in">
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-xs md:text-sm mb-4">
                <span>15 миллионов компаний выбрали Битрикс24</span>
            </div>
        </div>

        <h1 class="font-heading font-bold text-5xl md:text-7xl text-center mb-6 animate-fade-in text-gray-900">
            Платформа для управления<br>вашим бизнесом
        </h1>

        <p class="text-center text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto animate-fade-in">
            CRM, задачи, чаты, видеозвонки, склад, сайты и многое другое в одном месте
        </p>

        <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 md:mb-16 animate-fade-in">
            <a href="#pricing" class="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2">
                НАЧАТЬ РАБОТУ
            </a>
            <a href="#capabilities" class="w-full md:w-auto border-2 border-gray-900 text-gray-900 px-8 py-6 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all inline-block text-center">
                СМОТРЕТЬ ВОЗМОЖНОСТИ
            </a>
        </div>
    </div>
</section>

<!-- Capabilities Section -->
<section id="capabilities" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-[1460px] mx-auto">
        <h2 class="font-heading font-bold text-4xl md:text-5xl text-center mb-4">
            Возможности Битрикс24
        </h2>
        <p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Всё необходимое для управления бизнесом в одной платформе
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
                <div class="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">CRM</h3>
                <p class="text-gray-600">Управление клиентами, сделками и продажами в одном месте</p>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                <div class="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M9 3v18M3 9h18M3 15h18"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">Задачи и проекты</h3>
                <p class="text-gray-600">Планирование, постановка задач и контроль выполнения</p>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
                <div class="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">Мессенджер</h3>
                <p class="text-gray-600">Корпоративный чат для быстрого общения команды</p>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
                <div class="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">Телефония</h3>
                <p class="text-gray-600">Виртуальная АТС и интеграция с популярными операторами</p>
            </div>

            <div class="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
                <div class="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">Сайты и магазины</h3>
                <p class="text-gray-600">Создание сайтов и интернет-магазинов без программистов</p>
            </div>

            <div class="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-indigo-100">
                <div class="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" stroke="white" stroke-width="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900">Документы</h3>
                <p class="text-gray-600">Совместная работа с документами онлайн</p>
            </div>
        </div>
    </div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-[1460px] mx-auto">
        <h2 class="font-heading font-bold text-4xl md:text-5xl text-center mb-4">Тарифы</h2>
        <p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Выберите оптимальный план для вашего бизнеса
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 class="text-2xl font-bold mb-2">Базовый</h3>
                <p class="text-gray-600 mb-6">Для небольших команд</p>
                <div class="mb-6">
                    <span class="text-4xl font-bold">1 990 ₽</span>
                    <span class="text-gray-600">/мес</span>
                </div>
                <ul class="space-y-3 mb-8">
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>До 5 пользователей</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>CRM</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Задачи и проекты</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>24 ГБ на диске</span>
                    </li>
                </ul>
                <a href="#" class="block w-full bg-gray-900 text-white text-center py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Выбрать тариф
                </a>
            </div>

            <div class="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-xl border-4 border-blue-400 relative transform scale-105">
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm">
                    ПОПУЛЯРНЫЙ
                </div>
                <h3 class="text-2xl font-bold mb-2 text-white">Стандартный</h3>
                <p class="text-blue-100 mb-6">Для растущего бизнеса</p>
                <div class="mb-6">
                    <span class="text-4xl font-bold text-white">3 990 ₽</span>
                    <span class="text-blue-100">/мес</span>
                </div>
                <ul class="space-y-3 mb-8 text-white">
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>До 50 пользователей</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Всё из Базового</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Интернет-магазин</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>100 ГБ на диске</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Администрирование</span>
                    </li>
                </ul>
                <a href="#" class="block w-full bg-white text-blue-600 text-center py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
                    Выбрать тариф
                </a>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 class="text-2xl font-bold mb-2">Профессиональный</h3>
                <p class="text-gray-600 mb-6">Для крупных компаний</p>
                <div class="mb-6">
                    <span class="text-4xl font-bold">7 990 ₽</span>
                    <span class="text-gray-600">/мес</span>
                </div>
                <ul class="space-y-3 mb-8">
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Безлимит пользователей</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Всё из Стандартного</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Маркетинг и продажи</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>1024 ГБ на диске</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Приоритетная поддержка</span>
                    </li>
                </ul>
                <a href="#" class="block w-full bg-gray-900 text-white text-center py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Выбрать тариф
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Reviews Section -->
<section id="reviews" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-[1460px] mx-auto">
        <h2 class="font-heading font-bold text-4xl md:text-5xl text-center mb-4">
            Отзывы клиентов
        </h2>
        <p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Более 15 миллионов компаний уже используют Битрикс24
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        АП
                    </div>
                    <div>
                        <div class="font-bold">Алексей Петров</div>
                        <div class="text-sm text-gray-600">Директор, ООО "Прогресс"</div>
                    </div>
                </div>
                <div class="flex gap-1 mb-4">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-gray-700">
                    "Битрикс24 помог нам автоматизировать продажи и увеличить конверсию на 40%. Теперь все процессы под контролем!"
                </p>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        МИ
                    </div>
                    <div>
                        <div class="font-bold">Мария Иванова</div>
                        <div class="text-sm text-gray-600">Руководитель отдела продаж</div>
                    </div>
                </div>
                <div class="flex gap-1 mb-4">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-gray-700">
                    "Очень удобный CRM! Вся информация о клиентах в одном месте, ничего не теряется. Рекомендую!"
                </p>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        ДС
                    </div>
                    <div>
                        <div class="font-bold">Дмитрий Смирнов</div>
                        <div class="text-sm text-gray-600">IT-директор</div>
                    </div>
                </div>
                <div class="flex gap-1 mb-4">
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p class="text-gray-700">
                    "Отличное решение для управления проектами. Интеграция со всеми нужными сервисами работает безупречно."
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
    <div class="max-w-4xl mx-auto text-center text-white">
        <h2 class="font-heading font-bold text-4xl md:text-5xl mb-6">
            Готовы начать?
        </h2>
        <p class="text-xl mb-12 text-blue-100">
            Попробуйте Битрикс24 бесплатно прямо сейчас
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#" class="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-2">
                Начать бесплатно
            </a>
            <a href="tel:+78001234567" class="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all inline-flex items-center gap-2">
                8 800 123-45-67
            </a>
        </div>
    </div>
</section>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
