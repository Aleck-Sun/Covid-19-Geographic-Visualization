import './App.css';
import React, {useEffect, useState} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { combine } from './api/index.js';

function App() {
  // Gets the data for all the countries
  const [countriesData, setCountriesData] = useState([]);
  
  // Pop-up info when selecting markers
  const [selectedCountry, setSelectedCountry] = useState(null);

  //Selected Data Type
  const [selectedData, setSelectedData] = useState("Cases");

  // Updates and fetches the data only once after the page is loaded
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

  // Finds which data to display
  const whichData = (country) => {
    var dataReturn;
    // Based on which data type is selected
    if (selectedData == "Cases") {
      dataReturn = country.Cases;
    } else if (selectedData == "Recovered") {
      dataReturn = country.Recovered * 2;
    } else if (selectedData == "Deaths") {
      dataReturn = country.Deaths * 50;
    } else {
      dataReturn = country.DeathRecoveryRate * 25000;
    }
    return dataReturn;
  };

  return (
    <div className="App">
      <div className="map">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/abs-development/ckl3yn84m2vqp17nqkpx0glnh"
          onViewportChange={viewport => {setViewport(viewport);}}
        >
          {countriesData.length > 0 ? countriesData.map(country => {
            const dataType = whichData(country);
            return <Marker 
                      key = {country.CountryName}
                      latitude = {parseInt(country.Latitude)}
                      longitude = {parseInt(country.Longitude)}
                      offsetLeft = {parseInt(-dataType/160000)}
                      offsetTop = {parseInt(-dataType/160000)}>
              <button className="marker-btn" onClick={(e) => {
                e.preventDefault();
                setSelectedCountry(country);
              }}>
                <div className="dot" style={{width: dataType/100000+"px", height: dataType/100000+"px"}}>
                </div>
              </button>
            </Marker>
          }) : 'Loading...'}

          { selectedCountry === null ? null : (
            <Popup
              latitude={parseInt(selectedCountry.Latitude)}
              longitude={parseInt(selectedCountry.Longitude)}
              onClose={() => {
                setSelectedCountry(null);
                }}>
              <div>
                <h3>{selectedCountry.CountryName}</h3>
                <p>Cases: {selectedCountry.Cases}</p>
                <p>Deaths: {selectedCountry.Deaths}</p>
                <p>Recovered: {selectedCountry.Recovered}</p>
              </div>
            </Popup>)}
        </ReactMapGL>
      </div>
      <div className="title-bar" >
        <button className="title-btn" id="left-btn" autoFocus onClick={(e) => {
          e.preventDefault();
          setSelectedData("Cases");
        }}>
          Cases
        </button>
        <button className="title-btn" id="middle-btn" onClick={(e) => {
          e.preventDefault();
          setSelectedData("Deaths");
        }}>
          Deaths
        </button>
        <button className="title-btn" id="middle-btn" onClick={(e) => {
          e.preventDefault();
          setSelectedData("Recovered");
        }}>
          Recovered
        </button>
        <button className="title-btn" id="right-btn" onClick={(e) => {
          e.preventDefault();
          setSelectedData("DeathRecovery");
        }}>
          Death to Recovery Ratio
        </button>
      </div>
    </div>
  );
}

export default App;
