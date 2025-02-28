<?php 
require_once __DIR__ . '/bootstrap.php';

use App\Routes\Router;

// Start the routing process
$router = new Router();
$router->handleRequest();