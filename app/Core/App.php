<?php
namespace App\Core;

class App {
    private $router;

    public function __construct() {
        $this->router = new Router();
    }

    public function getRouter() {
        return $this->router;
    }

    public function run() {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'];
        $this->router->dispatch($method, $uri);
    }
}
