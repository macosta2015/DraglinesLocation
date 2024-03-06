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
      // Assume GeoLocation returns an object with Florida Coordinate System
      const { easting, northing } = await getGeoLocation();
      setCoordinates({ easting, northing });

      // Save coordinates to the backend
      await saveCoordinates({ easting, northing });

      console.log("Coordinates saved:", { easting, northing });
    } catch (error) {
      console.error('Error saving coordinates:', error);
    } finally {
      setFetchingLocation(false);
    }
  };

  const getGeoLocation = async () => {
    // Simulated function to get geolocation
    return { easting: 123456, northing: 654321 }; // Example Florida Coordinate System for Florida
  };

  const saveCoordinates = async (coordinates) => {
    try {
      // Make a POST request to the backend endpoint '/Draglines'
      await axios.post('http://localhost:3000/Draglines', coordinates); // Update the URL to match your backend endpoint
    } catch (error) {
      console.error('Error saving coordinates:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <GeoLocation fetching={fetchingLocation} />
        <Button onClick={handleClick} />
      </header>
    </div>
  );
}

export default App;
