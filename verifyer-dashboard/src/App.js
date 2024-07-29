import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SupportUs from './components/supportus/SupportUs';
import NearbyPlaces from './components/nearbyPlaces/Nearbyplaces';
import Appbar from './components/appbar/Appbar';
import AlertsList from './components/alertList/AlertList';

function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Routes>
          <Route path="/" element={<AlertsList />} />
          <Route path="/alerter" element={<AlertsList />} />
          <Route path="/resources" element={<NearbyPlaces />} />
          <Route path="/support" element={<SupportUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;