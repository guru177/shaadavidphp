<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = '127.0.0.1';
$db_name = 'shaadavid_db';
$username = 'root'; // Change if needed
$password = ''; // Change if needed

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode([
        "status" => "error", 
        "message" => "Connection failed: " . $e->getMessage()
    ]);
    exit;
}
?>
