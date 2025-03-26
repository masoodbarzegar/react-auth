<?php
namespace App\Controllers;

use App\Models\UserModel;
use Firebase\JWT\JWT;
use App\Config;
use Exception;

class AuthController{
	private $secretKey;

	public function __construct() {
		$this->secretKey = Config::get('app.jwt_secret_key');
	}

	public function login(){
		$data = json_decode(file_get_contents("php://input"));

		if (!isset($data->email, $data->password)) {
			echo json_encode(['status' => 'error', 'message' => 'Missing email or password']);
			exit;
		}

		$email = $data->email;
		$password = $data->password;

		try {
			$userModel = new UserModel();
			$user = $userModel->getUserByEmail($email);

			if (!$user || !password_verify($password, $user['password'])) {
				echo json_encode(['status' => 'invalid', 'message' => 'Invalid credentials']);
				exit;
			}

			// Generate JWT token
			$token = $this->generateToken([
				'email' => $user['email'],
				'first_name' => $user['first_name'],
				'last_name' => $user['last_name'],
			]);

			// Set JWT in an HTTP-only cookie
			setcookie('jwt', $token, [
				'expires' => time() + 3600,
				'path' => '/',
				'domain' => Config::get('app.cookie_domain'),
				'secure' => Config::get('app.cookie_secure'), // Only send over HTTPS
				'httponly' => true, // Prevent JavaScript access
				'samesite' => 'Strict', // Prevent CSRF attacks
			]);

			echo json_encode([
				'status' => 'valid',
				'data' => [
					'email' => $user['email'],
					'first_name' => $user['first_name'],
					'last_name' => $user['last_name']
				]
			]);

		} catch (Exception $e) {
			echo json_encode(['status' => 'error', 'message' => 'An error occurred: ' . $e->getMessage()]);
		}
	}

	public function register(){
		$data = json_decode(file_get_contents("php://input"));

		if (!isset($data->first_name, $data->last_name, $data->email, $data->password)) {
			echo json_encode(['status' => 'invalid', 'error' => 'Missing required fields']);
			exit;
		}

		$userModel = new UserModel();
		if ($userModel->getUserByEmail($data->email)) {
			echo json_encode(['status' => 'invalid', 'error' => 'Email already registered']);
			exit;
		}

		// Register new user
		$userId = $userModel->registerUser($data->first_name, $data->last_name, $data->email, $data->password);

		if ($userId) {
			echo json_encode(['status' => 'valid', 'message' => 'User registered successfully']);
		} else {
			echo json_encode(['status' => 'invalid', 'error' => 'User registration failed']);
		}
	}

	public function verifyAuth() {
		$user = \App\Middleware\MiddlewarePipeline::get('user');

		echo json_encode([
			'status' => 'valid',
			'user' => [
				'email' => $user->email,
				'first_name' => $user->first_name,
				'last_name' => $user->last_name
			]
		]);
	}

	private function generateToken($userData) {
		$payload = [
			'iss' => Config::get('app.base_url'),
			'aud' => Config::get('app.frontend_origin'),
			'iat' => time(),
			'exp' => time() + 3600, // 1 hour expiration
			'data' => $userData,
		];
		return JWT::encode($payload, $this->secretKey, 'HS256');
	}
}