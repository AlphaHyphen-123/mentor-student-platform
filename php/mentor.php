<?php
include 'db.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

if ($action == "getAll") {
    $sql = "SELECT * FROM mentors";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $mentors = [];
        while ($row = $result->fetch_assoc()) {
            $mentors[] = $row;
        }
        echo json_encode(["status" => "success", "mentors" => $mentors]);
    } else {
        echo json_encode(["status" => "error", "message" => "No mentors found"]);
    }
}

if ($action == "delete" && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "DELETE FROM mentors WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Mentor deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}
?>
