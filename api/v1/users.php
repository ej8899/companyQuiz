<?php

  if(!file_exists('config.php')) {
    echo 'The file config.php is corrupt or missing!';
  exit;
  }
  require('config.php');	

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

      // Convert the array to JSON
      $json_output = json_encode($users);

      // Output JSON
      header('Content-Type: application/json');
      echo $json_output;
  } else {
      // If no records found
      echo "No users found";
  }

  // Close connection
  $conn->close();

?>
