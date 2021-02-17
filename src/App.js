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
        {/* {countriesData.length > 0 ?
          <Marker key = {countriesData[180].CountryName} latitude = {parseInt(countriesData[180].Latitude)} longitude = {parseInt(countriesData[180].Longitude)}>
            <p className="marker-txt">This is a marker right here</p>
          </Marker>: 'Loading...'} */}
        {countriesData.length > 0 ? countriesData.map(country => {
          console.log("making marker:", country.CountryName, country.Latitude);
          <Marker key = {country.CountryName} latitude = {parseInt(country.Latitude)} longitude = {parseInt(country.Longitude)}>
            <p className="marker-txt">marker</p>
          </Marker>
        }) : 'Loading...'}
      </ReactMapGL>
    </div>
  );
}

export default App;
