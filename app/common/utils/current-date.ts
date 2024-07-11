function getCurrentFormattedDate() {
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
  
    const formattedDate = `${dayOfWeek}, ${dayOfMonth}${getDaySuffix(dayOfMonth)} ${month}, ${year}.`;
  
    return formattedDate;
  }
  
  function getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
const formattedDate = getCurrentFormattedDate();

export default formattedDate;
  