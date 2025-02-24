<?php
return [
	'host' => $_ENV['DB_HOST'] ?? 'localhost',
	'name' => $_ENV['DB_NAME'] ?? 'default_db',
	'user' => $_ENV['DB_USER'] ?? 'default_user',
	'pass' => $_ENV['DB_PASS'] ?? '',
];