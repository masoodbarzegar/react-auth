<?php
namespace App;

class Config {
	private static $config = [];

	public static function load(){
		self::$config = [
			'app' => require __DIR__ . '/../config/app.php',
			'database' => require __DIR__ . '/../config/database.php',
		];
	}

	public static function get($key, $default = null){

		$keys = explode('.', $key);
		$value = self::$config;

		foreach ($keys as $k) {
			if( !isset($value[$k])){
				return $default;
			}
			$value = $value[$k];
		}
		return $value;
	}
}