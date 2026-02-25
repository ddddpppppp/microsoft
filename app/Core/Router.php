<?php
namespace App\Core;

class Router {
    private $routes = [];
    private $groupPrefix = '';

    public function get($path, $handler) {
        $this->addRoute('GET', $this->groupPrefix . $path, $handler);
    }

    public function post($path, $handler) {
        $this->addRoute('POST', $this->groupPrefix . $path, $handler);
    }

    public function group($prefix, $callback) {
        $prev = $this->groupPrefix;
        $this->groupPrefix .= $prefix;
        $callback($this);
        $this->groupPrefix = $prev;
    }

    private function addRoute($method, $path, $handler) {
        $pattern = preg_replace('/\{([a-zA-Z_]+)\}/', '(?P<$1>[^/]+)', $path);
        $pattern = '#^' . $pattern . '$#';
        $this->routes[] = compact('method', 'pattern', 'handler', 'path');
    }

    public function dispatch($method, $uri) {
        $uri = parse_url($uri, PHP_URL_PATH);
        $uri = rtrim($uri, '/') ?: '/';

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) continue;
            if (preg_match($route['pattern'], $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return $this->callHandler($route['handler'], $params);
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
    }

    private function callHandler($handler, $params) {
        if (is_array($handler)) {
            $controller = new $handler[0]();
            return call_user_func_array([$controller, $handler[1]], $params);
        }
        return call_user_func_array($handler, $params);
    }
}
