function convertDateToCustomFormat(dateString) {
    const date = new Date(dateString);  // Create a Date object from the input string
  
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Return the formatted string as yyyy/mm/dd
    return `${year}/${month}/${day}`;
  }

  export default  convertDateToCustomFormat