<?php 
namespace App\Models;

use App\Config;
use App\Models\DatabaseConnection;

class BaseModel {
	protected $db;

	public function __construct(){
		$this->db = DatabaseConnection::getInstance(Config::get('database'))->getConnection();
	}

	public function findById($table, $id) {
		$stmt = $this->db->prepare("SELECT * FROM $table WHERE id = :id");
		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
}