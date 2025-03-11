<?php

namespace App\Models;

use PDO;
use PDOException;

class DatabaseConnection {
	private static $instance = null;
	private $connection;

	public function __construct($config){
		$dsn = "mysql:host={$config['host']};dbname={$config['name']};charset=utf8";
		$username = $config['user'];
		$password = $config['pass'];

		 try {
			// Establish database connection
			$this->connection = new PDO($dsn, $username, $password);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
			die("Database connection error: " . $e->getMessage());
		}
	}

	public static function getInstance($config) {
		if (self::$instance === null) {
			self::$instance = new DatabaseConnection($config);
		}
		return self::$instance;
	}

	public function getConnection() {
		return $this->connection;
	}

}