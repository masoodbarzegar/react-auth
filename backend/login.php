<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/bootstrap.php';

$dbConfig = $config['db'];

$servername = $dbConfig['host'];
$username = $dbConfig['user'];
$password = $dbConfig['pass'];
$database = $dbConfig['name'];

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

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


$sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
$sql->bind_param("s", $email);

if ($sql->execute()) {
	$result = $sql->get_result();


	if ($result->num_rows > 0) {
		http_response_code(200);
		$user = $result->fetch_assoc();

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
	} else {
		echo json_encode([
			'status' => 'invalid',
			'message' => 'User not found'
		]);
	}

} else {
	echo json_encode([
		'status' => 'error',
		'message' => 'Query execution failed: ' . $sql->error
	]);
}

// Close connection
$conn->close();