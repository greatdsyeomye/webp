<?php

$servername = "localhost";
$username = "root"; // MySQL 사용자 이름
$password = "1dPdms0425!"; // MySQL 비밀번호
$dbname = "shopdb"; // shopdb 스키마 이름

// MySQL 데이터베이스와 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 사용자가 입력한 데이터 가져오기
$phone = $_POST['input1'];
$name = $_POST['input2'];
$username = $_POST['input3'];
$password = $_POST['input4'];

// 데이터베이스에 사용자 정보 저장
$sql = "INSERT INTO users (phone, name, username, password) VALUES ('$phone', '$name', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "회원가입이 완료되었습니다!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

