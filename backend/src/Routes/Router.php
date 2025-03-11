<?php
namespace App\Routes;

use App\Controllers\AuthController;

class Router {
	private $routes = [];

	public function __construct() {
		$this->registerRoutes();
	}

	private function registerRoutes() {
		$this->routes = [
			'POST' => [
				'/login' => [AuthController::class, 'login'],
				'/register' => [AuthController::class, 'register']
			]
		];
	}

	public function handleRequest(){
		$method = $_SERVER['REQUEST_METHOD'];
		$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

		if (isset($this->routes[$method][$path])) {
			[$controller, $method] = $this->routes[$method][$path];
			$controllerInstance = new $controller();
			$controllerInstance->$method();
		} else {
			$this->handle404();
		}
	}

	private function handle404() {
		echo "Page Not Found!";
	}
}