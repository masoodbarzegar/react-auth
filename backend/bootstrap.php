<?php 
require_once __DIR__ . '/vendor/autoload.php';

use App\Config;
use Dotenv\Dotenv;

$envFile = '.env'; // Default

if (isset($_SERVER['APP_ENV'])) {
	if (getenv('APP_ENV') === 'production') {
		$envFile = '.env.production';
	} 
}

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__, $envFile);
$dotenv->load();

// Load configuration
Config::load();

// Set timezone
date_default_timezone_set(Config::get('app.timezone'));

// Start session
session_start();

// Set error reporting based on environment
if (Config::get('app.env') === 'local') {
	error_reporting(E_ALL);
	ini_set('display_errors', Config::get('app.debug') ? '1' : '0');
} else {
	error_reporting(0);
	ini_set('display_errors', Config::get('app.debug') ? '1' : '0');
}