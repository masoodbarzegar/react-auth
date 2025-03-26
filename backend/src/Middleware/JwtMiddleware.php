<?php
namespace App\Middleware;

use App\Config;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JwtMiddleware implements MiddlewareInterface {
	private $secretKey;

	public function __construct() {
		$this->secretKey = Config::get('app.jwt_secret_key');
	}

	public function handle($request, $next) {
		$token = $_COOKIE['jwt'] ?? '';

		if (empty($token)) {
			http_response_code(401);
			echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
			exit;
		}

		try {
			$decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
			$request->user = $decoded;
			return $next($request);
		} catch (Exception $e) {
			http_response_code(401);
			echo json_encode(['status' => 'error', 'message' => 'Invalid token']);
			exit;
		}
	}
}