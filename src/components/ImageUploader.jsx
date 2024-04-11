import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
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
console.log('selectedFile', selectedFile)
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
      
      // Use the pre-signed URL to upload the image to S3
      const uploadData = new FormData();
      uploadData.append('file', selectedFile);
console.log('upload Data:',uploadData)
      const uploadResponse = await fetch(presignedUrl.presignedUrl, {
        method: 'PUT',
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

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
      <p>{uploadMessage}</p>
    </div>
  );
};

export default ImageUpload;
