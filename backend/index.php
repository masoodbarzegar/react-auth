<?php 
require_once __DIR__ . '/bootstrap.php';

use App\Routes\Router;
use App\Config;

$allowedOrigin = Config::get('app.frontend_origin');

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
	header("Access-Control-Allow-Origin: $allowedOrigin");
	header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
	header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
	header("Access-Control-Allow-Credentials: true");
}

// Handle preflight (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

// Start the routing process
$router = new Router();
$router->handleRequest();