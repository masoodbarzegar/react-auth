<?php
namespace App\Controllers;

use App\Models\UserModel;
use Exception;

class AuthController{

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

			if (!$user) {
				echo json_encode(['status' => 'invalid', 'message' => 'User not found']);
				exit;
			}

			if (password_verify($password, $user['password'])) {
				echo json_encode([
					'status' => 'valid',
					'data' => [
						'email' => $user['email'],
						'first_name' => $user['first_name'],
						'last_name' => $user['last_name']
					]
				]);
			} else {
				echo json_encode(['status' => 'invalid', 'message' => 'Incorrect password']);
			}

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
}