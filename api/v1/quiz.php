<?php

function getQuizByQuizID($quizID) {
    global $servername, $username, $password, $database;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement to fetch quiz data by quizID
    $sql = "SELECT * FROM quizzes WHERE quizID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $quizID);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if quiz found
    if ($result->num_rows > 0) {
        // Fetch quiz record
        $quiz = $result->fetch_assoc();

        // Close statement and connection
        $stmt->close();
        $conn->close();

        // Decode the quizData JSON
        $quizData = json_decode($quiz['quizData'], true);

        // Add quizData to the quiz record
        $quiz['qna'] = $quizData;

        // Remove unnecessary columns
        unset($quiz['quizData']);

        return $quiz;
    } else {
        // If quiz not found
        return null;
    }
}

?>
