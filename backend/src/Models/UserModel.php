<?php
namespace App\Models;

use App\Models\BaseModel;

use PDO;

class UserModel extends BaseModel {
	protected $table = 'users';

	public function getUserByEmail($email) {
		$stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE email = :email");
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function registerUser($first_name, $last_name, $email, $password) {
		$hashed_password = password_hash($password, PASSWORD_DEFAULT);

		$stmt = $this->db->prepare("INSERT INTO {$this->table} (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)");
		$stmt->bindParam(':first_name', $first_name, PDO::PARAM_STR);
		$stmt->bindParam(':last_name', $last_name, PDO::PARAM_STR);
		$stmt->bindParam(':email', $email, PDO::PARAM_STR);
		$stmt->bindParam(':password', $hashed_password, PDO::PARAM_STR);

		return $stmt->execute() ? $this->db->lastInsertId() : false;
	}
}