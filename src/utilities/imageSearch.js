// imageSearch.js
// import axios from 'axios';

const fetchImage = async (keyword, retryCount = 3) => {
  return;
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: keyword,
        orientation: 'portrait', // Landscape-oriented images
        client_id: '', // Replace with your Unsplash API key
        w: 400, // Set the maximum width to 600 pixels
      },
    });

    if (response.status === 200) {
      const image = response.data.urls.regular;
      return image;
    } else {
      throw new Error(`Unsplash API returned status code ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    if (retryCount > 0) {
      console.log(`Retrying... (${retryCount} attempts remaining)`);
      return fetchImage(keyword, retryCount - 1);
    }
    return null; // Return null if all retry attempts fail
  }
};

export { fetchImage };
