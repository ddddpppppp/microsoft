<?php
namespace App\Core;

class View {
    public static function render($name, $data = []) {
        extract($data);
        $viewFile = __DIR__ . '/../Views/' . $name . '.php';
        if (!file_exists($viewFile)) {
            throw new \Exception("View not found: $name");
        }
        ob_start();
        require $viewFile;
        return ob_get_clean();
    }

    public static function renderWithLayout($layout, $view, $data = []) {
        $data['content'] = self::render($view, $data);
        return self::render($layout, $data);
    }
}
