import React, { useState, useEffect } from 'react';
import proj4 from 'proj4';

// Define the projection for WGS84 (latitude and longitude) and the Florida East zone
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs("EPSG:2236", "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-81 +k=0.999941177 +x_0=200000.0001016 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs");

function latLonToStatePlane(latitude, longitude) {
  // Convert from WGS84 (latitude and longitude) to State Plane Coordinate System (Florida East zone)
  const coordinates = proj4("EPSG:4326", "EPSG:2236", [longitude, latitude]);
  return { x: coordinates[0], y: coordinates[1] };
}

function GeoLocation({ fetching, onSaveCoordinates }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [coordinatesList, setCoordinatesList] = useState([]);

  useEffect(() => {
    if (fetching) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          error => {
            setError(error.message);
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
        console.log("Geolocation is not supported by your browser");
      }
    }
  }, [fetching]);

  const handleSaveCoordinates = () => {
    if (latitude !== null && longitude !== null) {
      const spcsCoordinates = latLonToStatePlane(latitude, longitude);
      setCoordinatesList([...coordinatesList, spcsCoordinates]);
      // Pass the coordinates data to the parent component (App.js)
      onSaveCoordinates({ latitude, longitude, statePlaneX: spcsCoordinates.x, statePlaneY: spcsCoordinates.y });
    }
  };

  return (
    <div>
      <h2>Geolocation Information</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {latitude !== null && longitude !== null && (
            <div>
              <p>Latitude: {latitude}, Longitude: {longitude}</p>
              <button onClick={handleSaveCoordinates}>Save Coordinates</button>
            </div>
          )}
        </div>
      )}
      <h3>Florida Coordinate System:</h3>
      <ul>
        {coordinatesList.map((coordinates, index) => (
          <li key={index}>X: {coordinates.x.toFixed(2)}, Y: {coordinates.y.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default GeoLocation;

// import React, { useState, useEffect } from 'react';
// import proj4 from 'proj4';

// // Define the projection for WGS84 (latitude and longitude) and the Florida East zone
// proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
// proj4.defs("EPSG:2236", "+proj=tmerc +lat_0=24.33333333333333 +lon_0=-81 +k=0.999941177 +x_0=200000.0001016 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs");

// function latLonToStatePlane(latitude, longitude) {
//   // Convert from WGS84 (latitude and longitude) to State Plane Coordinate System (Florida East zone)
//   const coordinates = proj4("EPSG:4326", "EPSG:2236", [longitude, latitude]);
//   return { x: coordinates[0], y: coordinates[1] };
// }

// function GeoLocation({ fetching }) {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [error, setError] = useState(null);
//   const [coordinatesList, setCoordinatesList] = useState([]);

//   useEffect(() => {
//     if (fetching) {
//       if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             setLatitude(position.coords.latitude);
//             setLongitude(position.coords.longitude);
//           },
//           error => {
//             setError(error.message);
//             console.error("Error getting geolocation:", error);
//           }
//         );
//       } else {
//         setError("Geolocation is not supported by your browser");
//         console.log("Geolocation is not supported by your browser");
//       }
//     }
//   }, [fetching]);

//   const handleSaveCoordinates = () => {
//     if (latitude !== null && longitude !== null) {
//       const spcsCoordinates = latLonToStatePlane(latitude, longitude);
//       setCoordinatesList([...coordinatesList, spcsCoordinates]);
//     }
//   };

//   return (
//     <div>
//       <h2>Geolocation Information</h2>
//       {error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div>
//           {latitude !== null && longitude !== null && (
//             <div>
//               <p>Latitude: {latitude}, Longitude: {longitude}</p>
//               <button onClick={handleSaveCoordinates}>Save Coordinates</button>
//             </div>
//           )}
//         </div>
//       )}
//       <h3>Florida Coordinate System:</h3>
//       <ul>
//         {coordinatesList.map((coordinates, index) => (
//           <li key={index}>X: {coordinates.x.toFixed(2)}, Y: {coordinates.y.toFixed(2)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default GeoLocation;
