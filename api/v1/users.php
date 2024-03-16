<?php

  if(!file_exists('config.php')) {
    echo 'The file config.php is corrupt or missing!';
  exit;
  }

  require('config.php');
  require('helpers.php');

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
  $sql = "SELECT users.*, scores.qid, scores.score, scores.date 
          FROM users 
          LEFT JOIN scores ON users.uid = scores.uid";

  // If CID is provided, add a condition to filter users by CID
  if ($cid !== null) {
      $sql .= " WHERE users.cid = ?";
  }

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
                  'name' => $row['name'], // Assuming 'name' is a field in the users table
                  'email' => $row['email'], // Assuming 'email' is a field in the users table
                  'scores' => array() // Initialize scores array for the user
              );
          }

          // Add the score details to the scores array for the user
          if ($row['qid'] !== null) {
              $users[$uid]['scores'][] = array(
                  "qid" => $row['qid'],
                  "score" => $row['score'],
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
  $stmt->bind_param("i", $uid);
  $stmt->execute();
  $result = $stmt->get_result();

  // Check if user found
  if ($result->num_rows > 0) {
      // Fetch user record
      $user = $result->fetch_assoc();

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

//
// Main code
//
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // If the request method is GET
  if (isset($_GET['uid']) && !empty($_GET['uid'])) {
      // If UID is specified in the URL, retrieve the user by UID
      $uid = $_GET['uid'];
      $user = getUserByUID($uid);
      if ($user) {
          header('Content-Type: application/json');
          echo json_encode($user);
      } else {
          http_response_code(404);
          echo json_encode(array("error" => "User not found"));
      }
  } elseif (isset($_GET['cid']) && !empty($_GET['cid'])) {
    // If CID is specified in the URL, retrieve users by CID
    $cid = $_GET['cid'];
    $users = getAllUsers($cid);
    header('Content-Type: application/json');
    echo json_encode($users);
  } else {
      // If neither UID nor CID is specified, return all users
      $users = getAllUsers();
      header('Content-Type: application/json');
      echo json_encode($users);
  }
  } else {
    // If the request method is not GET, return an error
    http_response_code(405);
    echo json_encode(array("error" => "Method not allowed"));
  }

?>