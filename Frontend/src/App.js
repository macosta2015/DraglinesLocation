import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
import Button from './components/Example.js'; // Import the Button component

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleClick = async () => {
    setFetchingLocation(true);
    try {
      // Assume GeoLocation returns an object with latitude and longitude
      const { latitude, longitude } = await getGeoLocation();
      setCoordinates({ latitude, longitude });

      // Save coordinates to the backend
      onSaveCoordinates({ latitude, longitude }); // Call onSaveCoordinates to send data to backend

      console.log("Coordinates saved:", { latitude, longitude });
    } catch (error) {
      console.error('Error saving coordinates:', error);
    } finally {
      setFetchingLocation(false);
    }
  };

  const onSaveCoordinates = async (data) => {
    try {
      // Make a POST request to the backend endpoint '/Draglines'
      await axios.post('https://common-spiders-behave.loca.lt/Draglines', data, {headers: {'Bypass-Tunnel-Reminder': 1}});
      // await axios.post('http://localhost:3000/Draglines', data); // Update the URL to match your backend endpoint
    } catch (error) {
      console.error('Error saving coordinates:', error);
    }
  };

  const getGeoLocation = async () => {
    // Simulated function to get geolocation
    return { latitude: 27.994402, longitude: -81.760254 }; // Example coordinates for Florida
  };

  return (
    <div className="App">
      <header className="App-header">
        <GeoLocation fetching={fetchingLocation} onSaveCoordinates={onSaveCoordinates} /> {/* Pass onSaveCoordinates as prop */}
        <Button onClick={handleClick} />
      </header>
    </div>
  );
}

export default App;

