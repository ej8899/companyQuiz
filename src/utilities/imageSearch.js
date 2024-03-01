// imageSearch.js


const fetchImage = async (keyword, retryCount = 3) => {
  return;
  try {
    const response = await fetch('https://api.unsplash.com/photos/random?query=' + keyword + '&orientation=landscape&w=200&client_id=', {
      headers: {
        'Authorization': 'Client-ID 4fRj7AMw1h-PMqQ8NDHBvg7U4_nzSuGISxujk6CKfP0' // Replace with your Unsplash API key
      }
    });

    if (!response.ok) {
      throw new Error(`Unsplash API returned status code ${response.status}`);
    }

    const responseData = await response.json();
    const image = responseData.urls.regular;
    return image;
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
