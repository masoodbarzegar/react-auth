<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';
Dotenv\Dotenv::createImmutable(__DIR__ . '/')->load();

$servername = getenv('DB_HOST');
$username = getenv('DB_USER');
$password = getenv('DB_PASS');
$database = getenv('DB_NAME');

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->first_name, $data->last_name, $data->email, $data->password)) {
	echo json_encode(['status' => 'invalid', 'error' => 'Missing required fields']);
	exit;
}

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$password = $data->password;

$check_sql = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check_sql->bind_param("s", $email);
$check_sql->execute();
$check_result = $check_sql->get_result();

if ($check_result->num_rows > 0) {
	echo json_encode(['status' => 'invalid', 'error' => 'Email already registered']);
	exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$sql = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
$sql->bind_param("ssss", $first_name, $last_name, $email, $hashed_password);

if ($sql->execute()) {
	echo json_encode([
		'status' => 'valid',
		'message' => 'User registered successfully',
		'data' => [
			'id' => $sql->insert_id,
			'first_name' => $first_name,
			'last_name' => $last_name,
			'email' => $email
		]
	]);
} else {
	echo json_encode([
		'status' => 'invalid',
		'error' => 'Query execution failed: ' . $sql->error
	]);
}

// Close connection
$conn->close();

?>
