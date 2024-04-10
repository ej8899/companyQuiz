<?php
require 'vendor/autoload.php'; // Include the AWS SDK for PHP

use Aws\S3\S3Client;

// AWS credentials
$credentials = [
    'key'    => 'your_access_key',
    'secret' => 'your_secret_key',
    'region' => 'your_aws_region',
];

// Create an S3Client
$s3Client = new S3Client([
    'version'     => 'latest',
    'region'      => $credentials['region'],
    'credentials' => $credentials,
]);

// Generate a pre-signed URL for uploading the image (valid for 1 hour)
$bucketName = 'your_bucket_name';
$objectKey = 'your_object_key/image.jpg'; // Set your desired object key
$expires = '+1 hour';

$command = $s3Client->getCommand('PutObject', [
    'Bucket' => $bucketName,
    'Key'    => $objectKey,
]);

$presignedUrl = $s3Client->createPresignedRequest($command, $expires)->getUri();

// Return the pre-signed URL to the React application
echo $presignedUrl;
?>
