<?php

  if(!file_exists('config.php')) {
    echo 'The file config.php is corrupt or missing!';
  exit;
  }
  require('config.php');

 // Function to get all users from the database
function getAllUsers() {
  global $servername, $username, $password, $database;

  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // SQL query to retrieve all records from the users table
  $sql = "SELECT * FROM users";
  $result = $conn->query($sql);

  // Check if any records are found
  if ($result->num_rows > 0) {
      // Array to hold the records
      $users = array();

      // Fetch each row and add it to the users array
      while ($row = $result->fetch_assoc()) {
          $users[] = $row;
      }

      // Close connection
      $conn->close();

      return $users;
  } else {
      // If no records found
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

// Main code
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
    $users = getUsersByCID($cid);
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