import React, { useEffect, useState } from 'react';
import { Button, Tabs, FileInput, Label, TextInput, Tooltip,  } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { HiMiniPhoto } from "react-icons/hi2";
import { FaLink } from "react-icons/fa6";
import { FaUnsplash } from "react-icons/fa";
import { MdGradient } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const ImageSearch = ({ onImageSelect, company, quizname }) => {
  // console.log('company props in imagesearch:',company)
  const [searchTerm, setSearchTerm] = useState(quizname || company.industry || 'computer quiz');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item ID (image or color)

  useEffect(() => {
    // Fetch initial search results on mount
    handleImageSearch();
  }, []);

  const handleImageSearch = async () => {
    // console.log('in image search')
    try {
      const response = await fetch(`https://www.erniejohnson.ca/apps/cquiz-api/unsplashproxy.php?query=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      // console.log(data);
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
    "#ffc0cb", // Pastel Red (Light Coral)
    "#90ee90", // Pastel Green (Light Green)
    "#c1d6fc", // Pastel Blue (Light Blue)
    "#ffff99", // Pastel Yellow
    "#f5f0f9", // Pastel Magenta (Very Light Pink)
    "#c2ffff", // Pastel Cyan (Light Cyan)
    "#f7f7f7", // Pastel White (Light Gray)
    "#d3d3d3", // Pastel Black (Gray)
    "#e0e0e0", // Pastel Gray (Light Gray)
    "#ffe0b3", // Pastel Orange (Light Peach)
    "#800000", // Dark Red (Maroon)
    "#006400", // Dark Green
    "#000080", // Dark Blue (Navy)
    "#996600", // Dark Yellow (Burnt Orange)
    "#800080", // Dark Magenta (Maroon)
    "#008080", // Dark Cyan (Teal)
    "#303030", // Dark White (Dark Gray)
    "#000000", // Black (already dark)
    "#333333", // Dark Gray
    "#a0522d", // Dark Orange (Rust)
  ];

  const gradientColorList = [
    ["#ffc0cb", "#800000"], // Sunset Gradient
    ["#c1d6fc", "#000080"], // Ocean Gradient
    ["#90ee90", "#006400"], // Forest Gradient
    ["#ffc0cb", "#90ee90", "#c1d6fc", "#ffff99"], // Pastel Rainbow
    ["#c1d6fc", "#f5f0f9"], // Sky Gradient
    ["#ffff99", "#a0522d"], // Citrus Gradient
    ["#c2ffff", "#800080"], // Berry Gradient
    ["#f7f7f7", "#303030"], // Smoke Gradient
    ["#d3d3d3", "#333333"], // Metallic Gradient
    ["#c2ffff", "#ffc0cb"], // Neon Gradient
    ["#f0d0c2", "#806040"], // Dusky Sunset
    ["#a0c6e8", "#003080"], // Midnight Ocean
    ["#d0e0c6", "#33472b"], // Moss Forest
    ["#f0d0c2", "#d0e0c6", "#a0c6e8", "#e0e0e0"], // Muted Rainbow
    ["#a0c6e8", "#d3d3d3"], // Twilight Sky
    ["#e0e0e0", "#a07a52"], // Pale Citrus
    ["#d3d3d3", "#603060"], // Dusty Berry
    ["#f5f5f5", "#505050"], // Smoke & Ash
    ["#d3d3d3", "#666666"], // Worn Metal
    ["#d3d3d3", "#f0d0c2"], // Soft Neon
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
       <Tabs aria-label="Tabs with icons" style="underline">
      <Tabs.Item active title="Unsplash" icon={FaUnsplash}>
      <div className="flex flex-row items-center justify-center ">
      <span className="text-black dark:text-gray-200 text-lg font-sans mr-2">Unsplash Image Search:</span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-md border-2 border-gray-200 mb-0 w-1/2 text-black dark:text-black"
      />
      <Button type="button" onClick={handleImageSearch} className="ml-2"><FaSearch className="w-4 h-4 mr-2"/>Search</Button>
    </div>


      <div className="image-search-results flex flex-wrap justify-center">
        {searchResults.map((image, index) => (
          <img
            src={image.urls.small}
            alt={`Result ${index}`}
            key={index}
            width="110"
            height="80"
            onClick={() => handleClick(image.urls.thumb)}
            className={
              selectedItemId === image.urls.thumb
                ? "border-4 border-green-500 rounded-xl m-2 hover:border-red-500"
                : "border-4 border-slate-400 rounded-xl hover:border-red-500 m-2"
            }
          />
        ))}
      </div>

      </Tabs.Item>

      <Tabs.Item title="Solid Colors" icon={MdDashboard}>
      <div className="image-search-results flex flex-wrap justify-center">
        {colorList.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color, width: "110px", height: "80px" }}
            className={`color-block m-2 rounded-xl hover:bg-opacity-75 ${
              selectedItemId === index
                ? "border-4 border-green-500" // Selected color border
                : "border-4 border-slate-400 hover:border-red-500"
            }`}
            onClick={() => handleClick(null, index)} // Pass null for image URL, index for color selection
          />
        ))}
      </div>
      </Tabs.Item>
      <Tabs.Item title="Gradient Colors" icon={MdGradient}>
      <div className="image-search-results flex flex-wrap justify-center">
        {gradientColorList.map((gradient, index) => (
          <div
          key={index}
          style={{
            background: `linear-gradient(to bottom right, ${gradient[0]}, ${gradient[1]})`,
            width: "110px",
            height: "80px",
          }}
          className={`color-block m-2 rounded-xl hover:bg-opacity-75 ${
            selectedItemId === index
              ? "border-4 border-green-500" // Selected color border
              : "border-4 border-slate-400 hover:border-red-500"
          }`}
          onClick={() => handleClick(null, index)} // Pass null for image URL, index for color selection
        />
        ))}
      </div>
      </Tabs.Item>

      <Tabs.Item title="Link" icon={FaLink}>
        <div className="w-full flex flex-row justify-center">
          <div className="flex flex-col justify-center">
          <div className="dark:text-slate-300 mt-4">
          Enter a link to any image on the web and we&apos;ll try to use it for your quiz background!
          </div>
          <div className="relative mb-6 mt-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaLink className="w-6 h-6"/>
            </div>
            <input type="text" id="input-group-1" className="ml-2bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://www.example.com/path/to/image.jpg"/>
            </div>
            <Button>Submit</Button>
          </div>
        </div>
      </Tabs.Item>

      <Tabs.Item title="Upload" icon={HiMiniPhoto}>
        <div className="w-full flex flex-row justify-center">
          <div className="flex flex-col justify-center">
          <div className="dark:text-slate-300 mt-4">
          Upload your favorite image or photo and we&apos;ll try to use it for your quiz background!
          </div>
          
          <Button><HiMiniPhoto className="mr-2 h-5 w-5" />Select image to upload</Button>
          </div>
          </div>
  
        <div className="dark:text-slate-300 w-full text-center">Images wider than 1500 pixels work best. Max 5Mb per file.</div>
        <div className="dark:text-slate-300 w-full text-center mt-2">(Enterprise user feature only)</div>
      
      </Tabs.Item>
    </Tabs>
 
    </div>
  );
};

export default ImageSearch;
