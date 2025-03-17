<?php
namespace App\Middleware;

interface MiddlewareInterface {
	public function handle($request, $next);
}