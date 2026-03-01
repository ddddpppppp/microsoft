<?php
namespace App\Core;

class Controller {
    protected function json($data, $code = 200) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    protected function view($name, $data = [], $return = false) {
        extract($data);
        $viewFile = __DIR__ . '/../Views/' . $name . '.php';
        if (!file_exists($viewFile)) {
            http_response_code(500);
            echo "View not found: $name";
            exit;
        }
        ob_start();
        require $viewFile;
        $html = ob_get_clean();
        if ($return) return $html;
        echo $html;
        exit;
    }

    protected function redirect($url) {
        header("Location: $url");
        exit;
    }

    protected function db() {
        return Database::getInstance();
    }
}
