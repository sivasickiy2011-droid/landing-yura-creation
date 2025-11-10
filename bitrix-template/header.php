<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

use Bitrix\Main\Page\Asset;

$asset = Asset::getInstance();
$asset->addCss(SITE_TEMPLATE_PATH."/template_styles.css");
$asset->addJs(SITE_TEMPLATE_PATH."/script.js");
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php $APPLICATION->ShowHead(); ?>
    <title><?php $APPLICATION->ShowTitle(); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <?php $APPLICATION->ShowPanel(); ?>

    <!-- Header Navigation -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300">
        <div class="max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="8" cy="8" r="3" fill="white"/>
                            <circle cx="16" cy="8" r="3" fill="white"/>
                            <circle cx="12" cy="16" r="3" fill="white"/>
                            <path d="M8 8 L16 8 L12 16 Z" stroke="white" stroke-width="1.5" fill="none"/>
                        </svg>
                    </div>
                    <span class="font-heading font-bold text-xl">Битрикс24</span>
                </div>

                <?php
                $APPLICATION->IncludeComponent(
                    "bitrix:menu",
                    "top_menu",
                    array(
                        "ROOT_MENU_TYPE" => "top",
                        "MAX_LEVEL" => "1",
                        "USE_EXT" => "N",
                        "MENU_CACHE_TYPE" => "A",
                        "MENU_CACHE_TIME" => "3600",
                        "MENU_CACHE_USE_GROUPS" => "Y",
                        "MENU_CACHE_GET_VARS" => array()
                    ),
                    false
                );
                ?>

                <a href="#contact" class="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all">
                    СВЯЗАТЬСЯ
                </a>

                <button id="mobile-menu-btn" class="md:hidden p-2">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <nav class="flex flex-col p-4 space-y-2">
                <?php
                $APPLICATION->IncludeComponent(
                    "bitrix:menu",
                    "mobile_menu",
                    array(
                        "ROOT_MENU_TYPE" => "top",
                        "MAX_LEVEL" => "1",
                        "USE_EXT" => "N"
                    ),
                    false
                );
                ?>
            </nav>
        </div>
    </header>

    <main>