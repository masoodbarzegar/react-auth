<?php
namespace App\Middleware;

class MiddlewarePipeline {
	private $middlewares = [];
	private static $requestData = [];

	public function add($middleware) {
		if (is_string($middleware) && class_exists("App\\Middleware\\$middleware")) {
			$middleware = new ("App\\Middleware\\$middleware")();
		}
		$this->middlewares[] = $middleware;
	}

	public function handle($request, $finalHandler) {
		self::$requestData = [];

		$next = function ($request) use ($finalHandler) {
			return $finalHandler($request);
		};

		foreach (array_reverse($this->middlewares) as $middleware) {
			$next = function ($request) use ($middleware, $next) {
				return $middleware->handle($request, $next);
			};
		}

		return $next($request);
	}

	public static function set($key, $value) {
		self::$requestData[$key] = $value;
	}

	public static function get($key) {
		return self::$requestData[$key] ?? null;
	}
}