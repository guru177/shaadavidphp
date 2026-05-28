<?php
require_once 'config.php';
$sql = file_get_contents(__DIR__ . '/shaadavid_db.sql');
try {
    $conn->exec($sql);
    echo "SQL Executed Successfully\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
