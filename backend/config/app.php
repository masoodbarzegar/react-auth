<?php
return [
	'env' => $_ENV['APP_ENV'] ?? 'production',
	'debug' => filter_var($_ENV['APP_DEBUG'] ?? false, FILTER_VALIDATE_BOOLEAN),
	'base_url' => $_ENV['BASE_URL'] ?? 'https://masoudbarzegar.com',
	'frontend_origin' => $_ENV['FRONTEND_ORIGIN'] ?? 'http://localhost:3000',
	'timezone' => $_ENV['APP_TIMEZONE'] ?? 'UTC',
];