<?php

  if(!file_exists('config.php')) {
    echo 'The file config.php is corrupt or missing!';
  exit;
  }

  require('config.php');
  require('helpers.php');


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

      // Close statement and connection
      $stmt->close();
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
  $sql = "SELECT users.*, scores.qid, scores.score, scores.date 
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


// Function to add a new user to the database
function addUser($data) {
    global $servername, $username, $password, $database;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Extract data from JSON
    $username = $data['username'];
    $email = $data['email'];
    $cid = $data['cid'];
    $uid = generateUUID();

    // SQL query to insert new user
    $sql = "INSERT INTO users (name, email, cid, uid) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $email, $cid, $uid);

    // Execute the query
    if ($stmt->execute() === TRUE) {
        // Close statement and connection
        $stmt->close();
        $conn->close();
        return true;
    } else {
        // Close statement and connection
        $stmt->close();
        $conn->close();
        return false;
    }
}



//
// Main code
//

//
// Handle GET requests
//
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Handle preflight OPTIONS request
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
      exit(0);
  }

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
  } elseif (isset($_GET['email']) && !empty($_GET['email'])) {
    // If email is specified in the URL, retrieve the user by email
    $email = $_GET['email'];
    $user = getUserByEmail($email);
    if ($user) {
        header('Content-Type: application/json');
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(array("error" => "User not found"));
    } 
  } else {
      // If neither UID nor CID is specified, return all users
      $users = getAllUsers();
      header('Content-Type: application/json');
      echo json_encode($users);
  }
} 

// Handle POST requests
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // If the request method is POST
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  // Check if required fields are present in JSON
  if (isset($data['username'], $data['email'], $data['cid'])) {
      // Attempt to add the user
      if (addUser($data)) {
          http_response_code(201); // Created
          echo json_encode(array("message" => "User added successfully"));
      } else {
          http_response_code(500); // Internal Server Error
          echo json_encode(array("error" => "Failed to add user"));
      }
  } else {
      http_response_code(400); // Bad Request
      echo json_encode(array("error" => "Missing required fields"));
  }
}

else {
  // If the request method is not GET or POST, return an error
  http_response_code(405);
  echo json_encode(array("error" => "Method not allowed"));
}

?>