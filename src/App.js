import './App.css';
import React, {useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { combine } from './api/index.js';

function App() {
  // Gets the data for all the countries
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const data = combine();
    Promise.resolve(data)
      .then((datas) => {
        setCountriesData(datas);
      })
  }, []);

  // Initial viewport hook
  const [viewport, setViewport] = useState({
    latitude:	34.695645,
    longitude:  -30.514382,
    width: "100vw",
    height: "100vh",
    zoom: 2
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/abs-development/ckl3yn84m2vqp17nqkpx0glnh"
        onViewportChange={viewport => {setViewport(viewport);}}
      >
        {countriesData.length > 0 ? countriesData.map(country => {
          console.log("creating marker");
          <Marker
            latitude = {country.Latitude}
            longitude = {country.Longitude}>
              <div id="countryCases">
                <button id="marker-btn">
                  <img src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-059_pin_location-512.png" />
                </button>
              </div>
          </Marker>
        }) : 'Loading...'}
      </ReactMapGL>
    </div>
  );
}

export default App;
