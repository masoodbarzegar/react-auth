<?php
namespace App\Middleware;

class MiddlewarePipeline {
	private $middlewares = [];

	public function add($middleware) {
		$this->middlewares[] = $middleware;
	}

	public function handle($request, $finalHandler) {
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
}