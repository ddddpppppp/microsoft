<?php
namespace App\Core;

class Response {
    public static function json($data, $code = 200) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function html($content, $code = 200) {
        http_response_code($code);
        header('Content-Type: text/html; charset=utf-8');
        echo $content;
        exit;
    }

    public static function redirect($url) {
        header("Location: $url");
        exit;
    }
}
