<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

require_once 'db.php';

// Get input data (JSON)
$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$role = $input['role'] ?? '';

// Query user
$sql = "SELECT id, fullname, role, password FROM users WHERE email=? AND role=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Agar password match hota hai (plain password example, aapko hash use karna chahiye)
    if ($user['password'] === $password) {
        echo json_encode([
            "success" => true,
            "id" => $user['id'],
            "fullname" => $user['fullname'],
            "role" => $user['role']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$conn->close();
?>
