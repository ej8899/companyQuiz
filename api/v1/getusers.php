<?php

// Function to get user by email from the database
function getUserByEmail($email) {
  global $servername, $username, $password, $database;

  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // SQL query to retrieve user by email
  $sql = "SELECT * FROM users WHERE email = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $result = $stmt->get_result();

  // Check if user found
  if ($result->num_rows > 0) {
      // Fetch user record
      $user = $result->fetch_assoc();
      $uid = $user['uid'];

      // Get scores associated with the user
      $sql_scores = "SELECT qid, score, passingGrade, date FROM scores WHERE uid = ?";
      $stmt_scores = $conn->prepare($sql_scores);
      $stmt_scores->bind_param("i", $uid);
      $stmt_scores->execute();
      $result_scores = $stmt_scores->get_result();

      // Check if scores found
      if ($result_scores->num_rows > 0) {
          // Initialize scores array
          $user['scores'] = array();

          // Fetch each score and add it to the scores array
          while ($row = $result_scores->fetch_assoc()) {
              $user['scores'][] = array(
                  "qid" => $row['qid'],
                  "score" => $row['score'],
                  "passingGrade" => $row['passingGrade'],
                  "date" => $row['date']
              );
          }
      }

      // Close statement and connection
      $stmt->close();
      $stmt_scores->close();
      $conn->close();

      return $user;
  } else {
      // If user not found
      return null;
  }
}


 // Function to get all users from the database
function getAllUsers($cid = null) {
  global $servername, $username, $password, $database;

  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // SQL query to retrieve records from the users table
  $sql = "SELECT users.*, scores.qid, scores.score, scores.passingGrade, scores.date 
          FROM users 
          LEFT JOIN scores ON users.uid = scores.uid";

  // If CID is provided, add a condition to filter users by CID
  if ($cid !== null) {
      $sql .= " WHERE users.cid = ? AND users.admin !='1'";
  }
  // if ($cid !== null) {
  //   // Add an additional condition to exclude records where UID matches CID
  //   $sql .= " WHERE users.cid = ? AND users.uid != ?";
  // }

  // Prepare the SQL statement
  $stmt = $conn->prepare($sql);

  // Bind CID parameter if provided
  if ($cid !== null) {
      $stmt->bind_param("i", $cid);
  }

  // Execute the query
  $stmt->execute();
  $result = $stmt->get_result();

  // Check if any records are found
  if ($result->num_rows > 0) {
      // Associative array to hold users and their scores
      $users = array();

      // Fetch each row and add it to the users array
      while ($row = $result->fetch_assoc()) {
          $uid = $row['uid'];

          // If user data doesn't exist in the users array, initialize it
          if (!isset($users[$uid])) {
              $users[$uid] = array(
                  'uid' => $uid,
                  'name' => $row['name'],
                  'email' => $row['email'],
                  'admin' => $row['admin'],
                  'logo' => $row['logo'],
                  'bgimage' => $row['bgimage'],
                  'industry' => $row['industry'],
                  'scores' => array() // Initialize scores array for the user
              );
          }

          // Add the score details to the scores array for the user
          if ($row['qid'] !== null) {
              $users[$uid]['scores'][] = array(
                  "qid" => $row['qid'],
                  "score" => $row['score'],
                  "passingGrade" => $row['passingGrade'],
                  "date" => $row['date']
              );
          }
      }

      // Close statement and connection
      $stmt->close();
      $conn->close();

      // Return users as a numerically indexed array
      return array_values($users);
  } else {
      // Close statement and connection
      $stmt->close();
      $conn->close();

      // If no records found, return an empty array
      return array();
  }
}

// Function to get user by UID from the database
function getUserByUID($uid) {
  global $servername, $username, $password, $database;

  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // SQL query to retrieve user by UID
  $sql = "SELECT * FROM users WHERE uid = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $uid);
  $stmt->execute();
  $result = $stmt->get_result();

  // Check if user found
  if ($result->num_rows > 0) {
      // Fetch user record
      $user = $result->fetch_assoc();

      // Check if the user is an admin
      if ($user['admin'] == 1) {
          // If the user is an admin, retrieve quizList
          $quizList = array();
          $sql_quizlist = "SELECT qid, quizName, quizType FROM quizlist WHERE cid = ?";
          $stmt_quizlist = $conn->prepare($sql_quizlist);
          $stmt_quizlist->bind_param("s", $uid);
          $stmt_quizlist->execute();
          $result_quizlist = $stmt_quizlist->get_result();

          // Fetch each row and add it to the quizList array as an object
          while ($row_quizlist = $result_quizlist->fetch_assoc()) {
              $quizList[] = array(
                  "qid" => $row_quizlist['qid'],
                  "quizName" => $row_quizlist['quizName'],
                  "quizType" => $row_quizlist['quizType']
              );
          }

          // Add quizList to the user data
          $user['quizList'] = $quizList;
      }

      // Close statement and connection
      $stmt->close();
      $conn->close();

      return $user;
  } else {
      // If user not found
      return null;
  }
}



// Function to get users by CID from the database
function getUsersByCID($cid) {
  global $servername, $username, $password, $database;

  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // SQL query to retrieve users by CID
  $sql = "SELECT * FROM users WHERE cid = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $cid);
  $stmt->execute();
  $result = $stmt->get_result();

  // Check if any records are found
  if ($result->num_rows > 0) {
      // Array to hold the records
      $users = array();

      // Fetch each row and add it to the users array
      while ($row = $result->fetch_assoc()) {
          $users[] = $row;
      }

      // Close statement and connection
      $stmt->close();
      $conn->close();

      return $users;
  } else {
      // If no records found
      return array();
  }
}

?>