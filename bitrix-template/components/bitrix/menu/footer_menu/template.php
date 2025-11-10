<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
?>

<? if(!empty($arResult)): ?>
    <div class="col-span-3 grid grid-cols-3 gap-8">
        <?
        $columns = array_chunk($arResult, ceil(count($arResult)/3));
        foreach($columns as $column):
        ?>
            <div>
                <ul class="space-y-2">
                    <? foreach($column as $arItem): ?>
                        <li>
                            <a href="<?=$arItem["LINK"]?>" class="text-gray-400 hover:text-white text-sm transition-colors">
                                <?=$arItem["TEXT"]?>
                            </a>
                        </li>
                    <? endforeach; ?>
                </ul>
            </div>
        <? endforeach; ?>
    </div>
<? endif; ?>
