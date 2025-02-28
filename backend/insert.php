<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use App\Models\UserModel;

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->first_name, $data->last_name, $data->email, $data->password)) {
	echo json_encode(['status' => 'invalid', 'error' => 'Missing required fields']);
	exit;
}

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$password = $data->password;

$userModel = new UserModel();

// Check if email already exists
if ($userModel->getUserByEmail($email)) {
	echo json_encode(['status' => 'invalid', 'error' => 'Email already registered']);
	exit;
}

// Register new user
$userId = $userModel->registerUser($first_name, $last_name, $email, $password);

if ($userId) {
	echo json_encode([
		'status' => 'valid',
		'message' => 'User registered successfully',
		'data' => [
			'id' => $userId,
			'first_name' => $first_name,
			'last_name' => $last_name,
			'email' => $email
		]
	]);
} else {
	echo json_encode(['status' => 'invalid', 'error' => 'User registration failed']);
}
?>
