<?php

  if(!file_exists('config.php')) {
    echo 'The file config.php is corrupt or missing!';
  exit;
  }

  require('config.php');
  require('helpers.php');
  require('quiz.php');
  require('getusers.php');





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


// Function to add scores to the database
function addScores($data)
{
    global $servername, $username, $password, $database;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Extract data from JSON
    $date = $data['date'];
    $uid = $data['uid'];
    $qid = $data['qid'];
    $score = $data['score'];
    $passingGrade = $data['passingGrade'];

    // SQL query to insert new score
    $sql = "UPDATE scores SET date = ?, score = ?, passingGrade = ? WHERE uid = ? AND qid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sddss", $date, $score, $passingGrade, $uid, $qid);


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
  } elseif (isset($_GET['qid']) && !empty($_GET['qid'])) {
    // If QID is specified in the URL, retrieve QUIZ by QID
    $qid = $_GET['qid'];
    $quiz = getQuizByQuizID($qid);
    if($quiz) {
      header('Content-Type: application/json');
      echo json_encode($quiz);
    } else {
      http_response_code(404);
      echo json_encode(array("error" => "Quiz not found"));
    }
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
  } elseif (isset($data['date'], $data['uid'], $data['qid'], $data['score'], $data['passingGrade'])) {
    // Attempt to add the scores
    if (addScores($data)) {
        http_response_code(201); // Created
        echo json_encode(array("message" => "Scores added successfully"));
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(array("error" => "Failed to add scores"));
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