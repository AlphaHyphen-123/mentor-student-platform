<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// DB Connection
$conn = new mysqli("localhost", "root", "Shivam@123", "mentorshipDB");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB Connection failed"]));
}

// Get data from FormData
$name = $_POST['name'] ?? '';
$role = $_POST['role'] ?? '';
$company = $_POST['company'] ?? '';
$technologies = $_POST['technologies'] ?? '[]';
$ownerId = $_POST['ownerId'] ?? '';

// Handle image upload
$imagePath = "";
if (isset($_FILES['image'])) {
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    $fileName = time() . "_" . basename($_FILES["image"]["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = $targetFile;
    } else {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit;
    }
}

// Insert into DB
$sql = "INSERT INTO mentors (name, role, company, technologies, image, ownerId) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssi", $name, $role, $company, $technologies, $imagePath, $ownerId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Mentor added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "DB insert failed"]);
}

$conn->close();
?>
