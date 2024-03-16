// ImageSearch.js
import React, { useState } from 'react';
import { Button } from 'flowbite-react';

const ImageSearch = ({ onImageSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleImageSearch = async () => {
    try {
      const response = await fetch(`https://www.erniejohnson.ca/apps/cquiz-api/unsplashproxy.php?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    onImageSelect(imageUrl);
  };


  return (
    <div>
      <label className="text-black dark:text-gray-200 text-lg font-sans">
        Image Search:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border-2 border-gray-200 mb-4 text-black dark:text-black"
        />
        <Button type="button" onClick={handleImageSearch}>Search</Button>
      </label>
      <div className="image-search-results">
        {searchResults.map((image, index) => (
          <img src={image.urls.small} 
          alt={`Result ${index}`} 
          key={index} 
          onClick={() => handleImageClick(image.urls.small)}
          className={selectedImageUrl === image.urls.small ? 'border-2 border-green-500 rounded-xl m-2 hover:border-red-500' : 'border-2 border-slate-400 rounded-xl  hover:border-red-500 m-2'}
         />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
