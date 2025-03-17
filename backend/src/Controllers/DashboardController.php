<?php
namespace App\Controllers;

class DashboardController {
	public function getDashboardData($decoded) {
		$staticData = [
			'birthday' => '1990-01-01',
			'address' => '123 Main St',
		];
		echo json_encode(['status' => 'valid', 'data' => $staticData]);
	}
}