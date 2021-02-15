import './App.css';
import React, {useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

function App() {
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
      </ReactMapGL>
    </div>
  );
}

export default App;
