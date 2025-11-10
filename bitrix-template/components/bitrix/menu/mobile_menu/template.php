<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>

<? if(!empty($arResult)): ?>
    <? foreach($arResult as $arItem): ?>
        <a href="<?=$arItem["LINK"]?>" 
           class="block px-4 py-2 <?=$arItem["SELECTED"]?'bg-blue-50 text-blue-600 font-semibold':'text-gray-700 hover:bg-gray-50'?> rounded-lg transition-colors">
            <?=$arItem["TEXT"]?>
        </a>
    <? endforeach; ?>
<? endif; ?>
