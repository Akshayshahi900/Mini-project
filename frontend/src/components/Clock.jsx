import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Clock = () => {
  const [formattedTime, setFormattedTime] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const cityName = useSelector((state) => state.weather.searchedLocation) || 'Local Time'; // Use searched city or default to 'Local Time'

  // Function to capitalize the first letter of the city name
  const capitalizeCityName = (name) => {
    if (!name) return ''; // Return empty if no name
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(' ');
  };

  useEffect(() => {
    const updateTime = () => {
      const localTime = new Date(); // Get the current local time

      // Format the time without seconds
      const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
      setFormattedTime(localTime.toLocaleTimeString([], optionsTime));

      const optionsDate = { weekday: 'long', day: 'numeric', month: 'short' };
      setFormattedDate(localTime.toLocaleDateString([], optionsDate));
    };

    updateTime(); // Call it once to set the initial time

    const intervalId = setInterval(updateTime, 60000); // Update the time every minute

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    // <div style={{
    //   background: '',
    //   padding: '20px',
    //   borderRadius: '15px',
    //   color: '',
    //   width: '510px',
    //   height: '330px',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   fontFamily: 'Arial, sans-serif',
    //   boxShadow: '',
    // }}>
    <div className='bg-customWhite p-4 mt-9 w-[40vw] min-h-30 flex rounded-3xl '>
      <div className=' w-full '>
        <h2 className=''>Current Weather</h2>
        <h2 className='text-xl font-bold '>{capitalizeCityName(cityName)}</h2> 
        {formattedTime && <h4 className='text-xl font-bold'>{formattedTime}</h4>} {/* Display formatted time */}
        {formattedDate && <h3 className='text-xl font-bold'>{formattedDate}</h3>} 
      </div>

      <select className="w-28">
        <option value="celsius">Celsius</option>
        <option value="fahrenheit">Fahrenheit</option>
      </select>
    </div>
  );
};

export default Clock;
