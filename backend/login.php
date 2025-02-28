<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use App\Models\UserModel;

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->password)) {
	echo json_encode([
		'status' => 'error',
		'message' => 'Missing email or password'
	]);
	exit;
}

$email = $data->email;
$password = $data->password;

try {
	// Instantiate the UserModel
	$userModel = new UserModel();
	$user = $userModel->getUserByEmail($email);
	if (!$user) {
		echo json_encode([
			'status' => 'invalid',
			'message' => 'User not found'
		]);
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
		echo json_encode([
			'status' => 'invalid',
			'message' => 'Incorrect password'
		]);
	}

} catch (Exception $e) {
	echo json_encode([
		'status' => 'error',
		'message' => 'An error occurred: ' . $e->getMessage()
	]);
}
?>