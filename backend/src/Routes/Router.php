<?php
namespace App\Routes;

class Router {

	public function handleRequest(){
		// Get the requested URL path
		$path = $_SERVER['REQUEST_URI'];

		// Basic Routing Logic
		switch ($path) {
			case '/login':
				$this->handleLogin();
				break;
			case '/register':
				$this->handleRegister();
				break;
			default:
				$this->handle404();
				break;
		}
	}

	private function handleLogin() {
		// Include the existing login.php file from backend
		require_once __DIR__ . '/../../login.php';
	}

	private function handleRegister() {
		// Include the existing register.php file from backend
		require_once __DIR__ . '/../../insert.php';
	}

	private function handle404() {
		echo "Page Not Found!";
	}
}