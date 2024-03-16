<?php

function generateUUID() {
    $uuid = '';
    for ($i = 0; $i < 32; $i++) {
        $random = mt_rand(0, 15);
        if ($i === 8 || $i === 12 || $i === 16 || $i === 20) {
            $uuid .= '-';
        }
        $uuid .= ($i === 12 ? '4' : ($i === 16 ? ($random & 3) | 8 : $random)).dechex($random);
    }
    return $uuid;
}

?>
