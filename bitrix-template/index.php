<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * Главная страница лендинга Битрикс24
 * Использует компоненты и редактируемые области
 */
?>

<!-- Hero Section -->
<section class="relative pt-32 md:pt-48 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Background blobs -->
    <div class="absolute inset-0 z-0 opacity-40">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <!-- Floating icons -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none hidden md:block">
        <div class="absolute top-32 left-[5%] bg-white p-3 rounded-2xl shadow-lg animate-float">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
        </div>
        <!-- Дополнительные иконки интеграций -->
    </div>

    <div class="max-w-[1460px] mx-auto relative z-10 w-full">
        <div class="text-center mb-6 md:mb-8 animate-fade-in">
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-xs md:text-sm mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
                <span>15 миллионов компаний выбрали Битрикс24</span>
            </div>
        </div>

        <?php $APPLICATION->IncludeComponent(
            "bitrix:main.include",
            "",
            array(
                "AREA_FILE_SHOW" => "file",
                "PATH" => SITE_TEMPLATE_PATH . "/include/hero_title.php",
                "EDIT_TEMPLATE" => "standard.php"
            )
        ); ?>

        <?php $APPLICATION->IncludeComponent(
            "bitrix:main.include",
            "",
            array(
                "AREA_FILE_SHOW" => "file",
                "PATH" => SITE_TEMPLATE_PATH . "/include/hero_description.php",
                "EDIT_TEMPLATE" => "standard.php"
            )
        ); ?>

        <!-- Блок проблем и решений -->
        <div class="mb-12 md:mb-16 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
            <div class="flex items-center justify-center gap-3 mb-6">
                <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <h3 class="text-lg md:text-xl font-bold text-gray-900">Знакомые проблемы?</h3>
            </div>

            <?php $APPLICATION->IncludeComponent(
                "bitrix:main.include",
                "",
                array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => SITE_TEMPLATE_PATH . "/include/problems_slider.php",
                    "EDIT_TEMPLATE" => "standard.php"
                )
            ); ?>

            <div class="flex items-center justify-center mb-6">
                <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div class="mx-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce">
                    Битрикс24 решает это!
                </div>
                <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <?php $APPLICATION->IncludeComponent(
                "bitrix:main.include",
                "",
                array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => SITE_TEMPLATE_PATH . "/include/solutions_grid.php",
                    "EDIT_TEMPLATE" => "standard.php"
                )
            ); ?>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 md:mb-16 animate-fade-in">
            <a href="#pricing" class="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2">
                НАЧАТЬ РАБОТУ
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v7.5l4 3M6 17l-2-2v7l2-2 2 2 2-2 2 2 2-2 2 2V4l-2-2-2 2-2-2-2 2-2-2-2 2v13z"/>
                </svg>
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

        <?php $APPLICATION->IncludeComponent(
            "bitrix:news.list",
            "capabilities_cards",
            array(
                "IBLOCK_TYPE" => "content",
                "IBLOCK_ID" => "1", // ID инфоблока "Возможности"
                "NEWS_COUNT" => "20",
                "SORT_BY1" => "SORT",
                "SORT_ORDER1" => "ASC",
                "FILTER_NAME" => "",
                "FIELD_CODE" => array("NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE"),
                "PROPERTY_CODE" => array("ICON", "COLOR"),
                "SET_TITLE" => "N",
                "SET_BROWSER_TITLE" => "N",
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600"
            )
        ); ?>
    </div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-[1460px] mx-auto">
        <h2 class="font-heading font-bold text-4xl md:text-5xl text-center mb-4">Тарифы</h2>
        <p class="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Выберите оптимальный план для вашего бизнеса
        </p>

        <!-- Переключатель периода оплаты -->
        <div class="flex justify-center mb-12">
            <div class="bg-gray-100 rounded-full p-1 inline-flex">
                <button class="billing-toggle active px-6 py-3 rounded-full font-semibold transition-all" data-period="month">
                    6 месяцев
                </button>
                <button class="billing-toggle px-6 py-3 rounded-full font-semibold transition-all" data-period="year">
                    12 месяцев
                    <span class="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">-20%</span>
                </button>
            </div>
        </div>

        <?php $APPLICATION->IncludeComponent(
            "bitrix:catalog.section",
            "pricing_cards",
            array(
                "IBLOCK_TYPE" => "catalog",
                "IBLOCK_ID" => "2", // ID инфоблока "Тарифы"
                "SECTION_ID" => "",
                "ELEMENT_SORT_FIELD" => "sort",
                "ELEMENT_SORT_ORDER" => "asc",
                "FILTER_NAME" => "arrFilter",
                "INCLUDE_SUBSECTIONS" => "Y",
                "SHOW_ALL_WO_SECTION" => "Y",
                "PROPERTY_CODE" => array("PRICE_MONTH", "PRICE_YEAR", "FEATURES", "IS_POPULAR"),
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600"
            )
        ); ?>
    </div>
</section>

<!-- Reviews Section -->
<section id="reviews" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-[1460px] mx-auto">
        <h2 class="font-heading font-bold text-4xl md:text-5xl text-center mb-4">
            Отзывы клиентов
        </h2>
        <p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Более 15 миллионов компаний уже используют Битрикс24
        </p>

        <?php $APPLICATION->IncludeComponent(
            "bitrix:news.list",
            "reviews_slider",
            array(
                "IBLOCK_TYPE" => "content",
                "IBLOCK_ID" => "3", // ID инфоблока "Отзывы"
                "NEWS_COUNT" => "10",
                "SORT_BY1" => "SORT",
                "SORT_ORDER1" => "ASC",
                "PROPERTY_CODE" => array("AUTHOR", "POSITION", "COMPANY", "RATING", "AVATAR"),
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600"
            )
        ); ?>
    </div>
</section>

<!-- News Section -->
<section id="news" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-[1460px] mx-auto">
        <h2 class="font-heading font-bold text-4xl md:text-5xl text-center mb-4">
            Новости и статьи
        </h2>
        <p class="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Актуальные материалы о бизнес-автоматизации, CRM и digital-трансформации
        </p>

        <?php $APPLICATION->IncludeComponent(
            "bitrix:news.list",
            "news_grid",
            array(
                "IBLOCK_TYPE" => "news",
                "IBLOCK_ID" => "4", // ID инфоблока "Новости"
                "NEWS_COUNT" => "7",
                "SORT_BY1" => "ACTIVE_FROM",
                "SORT_ORDER1" => "DESC",
                "FILTER_NAME" => "",
                "FIELD_CODE" => array("NAME", "PREVIEW_TEXT", "PREVIEW_PICTURE", "ACTIVE_FROM"),
                "PROPERTY_CODE" => array("CATEGORY"),
                "DETAIL_URL" => "/news/#ELEMENT_CODE#/",
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600"
            )
        ); ?>
    </div>
</section>

<!-- Contact Form Section -->
<section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
    <div class="max-w-[1460px] mx-auto">
        <div class="max-w-3xl mx-auto text-center mb-12">
            <h2 class="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
                Начните использовать Битрикс24 уже сегодня
            </h2>
            <p class="text-blue-100 text-lg">
                Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут
            </p>
        </div>

        <?php $APPLICATION->IncludeComponent(
            "bitrix:form.result.new",
            "contact_form",
            array(
                "WEB_FORM_ID" => "1", // ID веб-формы
                "IGNORE_CUSTOM_TEMPLATE" => "N",
                "USE_EXTENDED_ERRORS" => "Y",
                "SEF_MODE" => "N",
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600",
                "LIST_URL" => "",
                "EDIT_URL" => "",
                "SUCCESS_URL" => "",
                "CHAIN_ITEM_TEXT" => "",
                "CHAIN_ITEM_LINK" => "",
                "VARIABLE_ALIASES" => array(
                    "WEB_FORM_ID" => "WEB_FORM_ID",
                    "RESULT_ID" => "RESULT_ID",
                )
            )
        ); ?>
    </div>
</section>
