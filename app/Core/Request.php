<?php
namespace App\Core;

class Request {
    public static function method() {
        return $_SERVER['REQUEST_METHOD'];
    }

    public static function uri() {
        return $_SERVER['REQUEST_URI'];
    }

    public static function get($key, $default = null) {
        return $_GET[$key] ?? $default;
    }

    public static function post($key, $default = null) {
        return $_POST[$key] ?? $default;
    }

    public static function all() {
        return array_merge($_GET, $_POST);
    }

    public static function isPost() {
        return self::method() === 'POST';
    }

    public static function jsonBody() {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
