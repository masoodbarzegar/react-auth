<?php
namespace App\Routes;

use App\Controllers\AuthController;
use App\Controllers\DashboardController;
use App\Middleware\MiddlewarePipeline;
use App\Middleware\JwtMiddleware;

class Router {
	private $routes = [];

	public function __construct() {
		$this->middlewarePipeline = new MiddlewarePipeline();
		$this->registerRoutes();
	}

	private function registerRoutes() {
		$this->routes = [
			'POST' => [
				'/login' => [
					'controller' => [AuthController::class, 'login'],
					'middleware' => [], // No middleware for login
				],
				'/register' => [
					'controller' => [AuthController::class, 'register'],
					'middleware' => [], // No middleware for register
				],
			],
			'GET' => [
				'/dashboard' => [
					'controller' => [DashboardController::class, 'index'],
					'middleware' => ['JwtMiddleware'],
				],
				'/verify-auth' => [
					'controller' => [AuthController::class, 'verifyAuth'],
					'middleware' => ['JwtMiddleware'],
				],
			],
		];
	}

	public function handleRequest(){
		$method = $_SERVER['REQUEST_METHOD'];
		$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

		if (isset($this->routes[$method][$path])) {
			$route = $this->routes[$method][$path];
			$controller = $route['controller'];
			$middleware = $route['middleware'] ?? [];

			// Create a middleware pipeline for this route
			$middlewarePipeline = new MiddlewarePipeline();
			foreach ($middleware as $mw) {
				$middlewarePipeline->add($mw);
			}

			$middlewarePipeline->handle($_SERVER, function () use ($controller) {
				[$controllerClass, $action] = $controller;
				$controllerInstance = new $controllerClass();
				$controllerInstance->$action();
			});
		} else {
			$this->handle404();
		}
	}

	private function handle404() {
		echo "Page Not Found!";
	}
}