import React, { useState } from 'react';
import { Progress } from "flowbite-react";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onUploadClick = async () => {
    console.log('Uploading file... (click action)');
    if (!selectedFile) {
      setUploadMessage('Please select an image file to upload.');
      return;
    }

    try {
      // Make a POST request to your backend API endpoint to get the pre-signed URL
      const response = await fetch('https://www.erniejohnson.ca/apps/cquiz-api/signedurl.php', {
        method: 'POST',
        mode: 'cors',
      });

      if (!response.ok) {
        console.log('abortError:',response.status)
        throw new Error(`API request failed with status ${response.status}`);
      }

      const presignedUrl = await response.json();
      
      console.log('Presigned URL:', presignedUrl.presignedUrl);
      
      // Create a new FormData object for the image file
      const uploadData = new FormData();
      uploadData.append('file', selectedFile);

      // Use the pre-signed URL to upload the image to S3
      const uploadResponse = await fetch(presignedUrl.presignedUrl, {
        method: 'PUT',
        body: selectedFile,
        // Track upload progress
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      setUploadProgress(100);
      setUploadMessage('Image uploaded successfully!');

    } catch (error) {
      console.error('upload error:',error);
      setUploadMessage('Error uploading image. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUploadClick}>Upload Image</button>
      {uploadProgress > 0 && uploadProgress < 100 && (
        // <progress value={uploadProgress} max="100">{uploadProgress}%</progress>
        <Progress progress={uploadProgress} />
      )}
      <Progress 
        progress={uploadProgress} 
        progressLabelPosition="inside"
        textLabel="Upload Progress..."
        textLabelPosition="outside"
        size="lg"
        labelProgress
        labelText
      />
      <p>{uploadMessage}</p>
    </div>
  );
};

export default ImageUpload;
