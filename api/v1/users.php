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
// Function to handle OpenAI API request for AI quizbuilder
//
function handleOpenAIRequest($numQuestions, $numOptions, $subject) {
  global $openai_api_key, $openai_url;
  
  $jsonTemplate = '{
    "qna": [
        {
            "question": "",
            "options": [
                {
                    "option": "",
                    "isCorrect": "(true/false)"
                }
            ]
        }
    ]
}';

  // Create payload data
  $data = array(
      "model" => "gpt-3.5-turbo",
      "stream" => false,
      "messages" => array(
          array(
              "role" => "user",
              "content" => "create $numQuestions multiple choice questions with $numOptions options each asking about $subject. write the answer as a JSON with the structure of $jsonTemplate"
          )
      )
  );

  // Initialize curl
  $ch = curl_init();

  // Set curl options
  curl_setopt($ch, CURLOPT_URL, $openai_url);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      "Content-Type: application/json",
      "Authorization: Bearer " . urlencode($openai_api_key) // URL encode the API key
  ));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

  // Execute curl request
  $response = curl_exec($ch);

  // Check for cURL errors
  if ($response === false) {
      $error = curl_error($ch);
      curl_close($ch);
      return json_encode(array("error" => "cURL error: $error"));
  }

  // Close curl
  curl_close($ch);


  // Decode the entire response JSON string
  $responseArray = json_decode($response, true);

  // Extract the content value as a string
  $contentString = $responseArray['choices'][0]['message']['content'];
    
  $responseArray = json_decode($contentString, true);
  //return json_decode($response);

  // Initialize an empty array to store the modified data
  $newData = array();

  // Iterate over each item in the array

foreach ($responseArray as $item) {
  // Check if the "options" key exists in the item
  if (isset($item['options'])) {
      // Remove the "options" key from the item
      unset($item['options']);
  }
  // Append the modified item to the new data array
  $newData[] = $item;
}
  //$json = json_encode($newData);

  // echo "contentString|";
//  echo json_encode($contentString);
  // echo $json;
  // echo "|end of test";
  return ($newData);
  // Decode the content string to get the array of objects
  
  // Return the response 
//return json_encode($contentString);

  // $contentArray = json_decode($contentString, true); // Decode the JSON string into an associative array
  // $newArray = array('qna' => $contentArray); // Create a new array with the key 'qna' and assign $contentArray to it
  // $newJson = json_encode($newArray); // Encode the new array as JSON
  // return $newJson;

  // $qna = array();

  // // Iterate through each question-answer pair
  // foreach ($contentString as $item) {
  //   echo $item;
  //     $questionObj = array(
  //         "question" => $item["question"],
  //         "options" => $item["options"],
  //         "correctAnswer" => $item["answer"]
  //     );
  //     // Append the formatted question-answer pair to the $qna array
  //     $qna[] = $questionObj;
  // }
  
  // // Encode the formatted data as JSON
  // $jsonOutput = json_encode(array("qna" => $qna), JSON_PRETTY_PRINT);
  
  // // Output the JSON
  // echo $jsonOutput;

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
  } elseif (isset($_GET["numQuestions"], $_GET["numOptions"], $_GET["subject"])) {
    //  AI QUIZ BUILDER
    $numQuestions = $_GET["numQuestions"];
    $numOptions = $_GET["numOptions"];
    $subject = $_GET["subject"];

    // Handle OpenAI API request
    $openai_response = handleOpenAIRequest($numQuestions, $numOptions, $subject);

    // Output the response
    echo json_encode($openai_response);
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