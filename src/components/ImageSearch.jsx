import React, { useState } from 'react';
import { Button } from 'flowbite-react';

const ImageSearch = ({ onImageSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item ID (image or color)

  const handleImageSearch = async () => {
    console.log('in image search')
    try {
      const response = await fetch(`https://www.erniejohnson.ca/apps/cquiz-api/unsplashproxy.php?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      console.log(data);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedItemId(imageUrl); // Update selected item ID with image URL
    onImageSelect(imageUrl);
  };

  const handleColorClick = (colorIndex) => {
    setSelectedItemId(colorIndex); // Update selected item ID with color index
  };

  const colorList = [
    "#f00", // Red
    "#0f0", // Green
    "#00f", // Blue
    "#ff0", // Yellow
    "#f0f", // Magenta
    "#0ff", // Cyan
    "#fff", // White
    "#000", // Black
    "#808080", // Gray
    "#ffa500", // Orange
  ];

  const handleClick = (imageUrl, colorIndex) => {
    // Handle selection logic - ensure only one item can be selected
    if (!selectedItemId || (imageUrl && imageUrl !== selectedItemId) || colorIndex !== selectedItemId) {
      if (imageUrl) {
        handleImageClick(imageUrl);
      } else {
        setSelectedItemId(colorIndex); // Update selected item ID with color index
      }
    }
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

      <div className="image-search-results flex flex-wrap justify-center">
        {searchResults.map((image, index) => (
          <img
            src={image.urls.small}
            alt={`Result ${index}`}
            key={index}
            width="130"
            height="130"
            onClick={() => handleClick(image.urls.thumb)}
            className={
              selectedItemId === image.urls.thumb
                ? "border-4 border-green-500 rounded-xl m-2 hover:border-red-500"
                : "border-4 border-slate-400 rounded-xl hover:border-red-500 m-2"
            }
          />
        ))}
      </div>

      <div className="image-search-results flex flex-wrap justify-center">
        {colorList.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color, width: "130px", height: "90px" }}
            className={`color-block m-2 rounded-xl hover:bg-opacity-75 ${
              selectedItemId === index
                ? "border-4 border-green-500" // Selected color border
                : "border-4 border-slate-400 hover:border-red-500"
            }`}
            onClick={() => handleClick(null, index)} // Pass null for image URL, index for color selection
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
