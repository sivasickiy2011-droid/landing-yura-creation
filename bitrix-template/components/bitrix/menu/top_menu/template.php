<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
?>

<?php if (!empty($arResult)): ?>
<nav class="hidden md:flex items-center gap-8">
    <?php foreach ($arResult as $arItem): ?>
        <?php if ($arItem["SELECTED"]): ?>
            <a href="<?= $arItem["LINK"] ?>" class="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                <?= $arItem["TEXT"] ?>
            </a>
        <?php else: ?>
            <a href="<?= $arItem["LINK"] ?>" class="text-gray-700 hover:text-blue-600 transition-colors">
                <?= $arItem["TEXT"] ?>
            </a>
        <?php endif; ?>
    <?php endforeach; ?>
</nav>
<?php endif; ?>
