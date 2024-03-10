

export const generateUUID = () => {
  let uuid = '';
  for (let i = 0; i < 32; i++) {
    const random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
};


export const todayLong = () => {
  const today = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Define an array of day suffixes
  const suffixes = ["st", "nd", "rd", "th"];
  
  const day = today.getDate();
  // Determine the suffix for the day
  const daySuffix = suffixes[(day - 1) % 10] || suffixes[3];
  
  
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  
  // Construct the long date format string
  const longDateFormat = `${dayOfWeek} ${month} ${day}${daySuffix}, ${year}`;
  return longDateFormat
};

export const setPageTitle = (newTitle) => {
  if(!newTitle) {
    newTitle = 'Company Quiz! | Streamline Your Employee Knowledge Assessments'
  }
  document.title = `${newTitle}`;
}