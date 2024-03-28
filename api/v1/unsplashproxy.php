<?php
  require('config.php');

  header("Access-Control-Allow-Origin: *");
  $searchTerm = urlencode($_GET['query']);

  // Set the Unsplash API endpoint and access key
  $unsplashEndpoint = "https://api.unsplash.com/search/photos?query={$searchTerm}&w=200&count=20&orientation=landscape&client_id={$unsplashkey}";
  
  // Make the request to Unsplash API
  $response = file_get_contents($unsplashEndpoint);

  echo $response;
?>
