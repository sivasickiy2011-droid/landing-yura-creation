<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>

<? if(!empty($arResult)): ?>
<nav class="hidden md:flex items-center gap-8">
    <? foreach($arResult as $arItem): ?>
        <? if($arItem["SELECTED"]): ?>
            <a href="<?=$arItem["LINK"]?>" class="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                <?=$arItem["TEXT"]?>
            </a>
        <? else: ?>
            <a href="<?=$arItem["LINK"]?>" class="text-gray-700 hover:text-blue-600 transition-colors">
                <?=$arItem["TEXT"]?>
            </a>
        <? endif; ?>
    <? endforeach; ?>
</nav>
<? endif; ?>