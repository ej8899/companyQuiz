<?php
require 'vendor/autoload.php'; // Include the AWS SDK for PHP
require 'config.php';

use Aws\S3\S3Client;




// Function to generate a pre-signed URL for uploading the image (valid for 5 minutes)
function generatePresignedUrl($bucketName, $objectKey, $credentials) {

  // Create an S3Client
  $s3Client = new S3Client([
    'version'     => 'latest',
    'region'      => $credentials['region'],
    'credentials' => $credentials,
  ]);

  $expires = '+35 minutes'; 

  $command = $s3Client->getCommand('PutObject', [
      'Bucket' => $bucketName,
      'Key'    => $objectKey,
  ]);

  return $s3Client->createPresignedRequest($command, $expires)->getUri();
}


  // Allow from any origin
  // if (isset($_SERVER['HTTP_ORIGIN'])) {
  //   header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  //   header('Access-Control-Allow-Credentials: true');
  //   header('Access-Control-Max-Age: 86400');    // cache for 1 day
  // }
  header("Access-Control-Allow-Origin: *");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $bucketName = 'cquiz-uploads'; // Replace with your bucket name
  $objectKey = 'imgfolder/' . uniqid() . '.jpg'; // Generate random object key

  $presignedUrl = generatePresignedUrl($bucketName, $objectKey, $credentials);

  // Return the pre-signed URL as JSON response
  header('Content-Type: application/json');
  echo json_encode([
      'presignedUrl' => $presignedUrl
  ]);
} else {
  // Handle invalid request method (optional)
  header('HTTP/1.1 405 Method Not Allowed');
  echo 'POST method required.';
} 

?>
