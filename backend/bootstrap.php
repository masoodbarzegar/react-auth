<?php 
require_once __DIR__ . '/vendor/autoload.php';

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

// Load the config
$config = require __DIR__ . '/config/config.php';

// Set timezone
$timezone = $config['app']['timezone']; // Use the value from app.php
date_default_timezone_set($timezone);

// Start session
session_start();

// Set error reporting based on environment
if ($config['app']['env'] === 'local') {
	error_reporting(E_ALL);
	ini_set('display_errors', $config['app']['debug'] ? '1' : '0');
} else {
	error_reporting(0);
	ini_set('display_errors', $config['app']['debug'] ? '1' : '0');
}