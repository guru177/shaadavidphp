<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure the response is JSON
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password)) {
    $username = trim($data->username);
    $password = $data->password;

    try {
        $stmt = $conn->prepare("SELECT id, username, password FROM admin WHERE username = :username LIMIT 1");
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if(password_verify($password, $row['password'])) {
                echo json_encode([
                    "status" => "success",
                    "user" => [
                        "id" => $row['id'],
                        "username" => $row['username']
                    ]
                ]);
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
        }
    } catch(PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Please provide username and password"]);
}
?>
