import React, { useState } from 'react';
import '../PredictionPage.css';

const states = [
  'Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Other'
];

const PredictionPage = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [location, setLocation] = useState('Gujarat');
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('sqm');
  const [consumption, setConsumption] = useState('1');
  const [battery, setBattery] = useState('no');
  const [installType, setInstallType] = useState('residential');
  const [shaded, setShaded] = useState('no');
  const [showResult, setShowResult] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [totalElectricity, setTotalElectricity] = useState('');
  const [electricityRate, setElectricityRate] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    setShowResult(true);
    setActiveTab('results');
  };

  const handleFetchCoordinates = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
        },
        (error) => {
          alert('Unable to fetch location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div
      className="prediction-outer"
      style={{
        background: "url('/images/SignupOptionsimage.jpg') center center/cover no-repeat",
        position: "relative",
        minHeight: "100vh"
      }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">SolarSaarthi</div>
        <ul className="navbar-links">
          <li>Home</li>
          <li>Solar Insights</li>
          <li>Solar Map</li>
          <li>Experiences</li>
          <li>About Us</li>
        </ul>
      </nav>
      <div
        className="prediction-tabs"
        style={{
          background: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/SignupOptionsimage.jpg') center center/cover no-repeat",
          borderRadius: "12px 12px 0 0"
        }}
      >
        <button className={activeTab === 'calculator' ? 'tab active' : 'tab'} onClick={() => setActiveTab('calculator')}>Calculator</button>
        <button className={activeTab === 'results' ? 'tab active' : 'tab'} onClick={() => setActiveTab('results')}>Results</button>
      </div>
      <div
        className={`prediction-content${activeTab === 'results' ? ' results-active' : ''}`}
      >
        {activeTab === 'calculator' && (
          <form className="prediction-form-card" onSubmit={handleCalculate}>
            <h2 className="form-title">System Requirements</h2>
            <p className="form-subtitle">Enter your details to calculate solar system requirements</p>
            <div className="form-row">
              <div className="form-group">
                <label>Latitude</label>
                <input type="text" value={latitude} readOnly placeholder="Latitude" />
              </div>
              <div className="form-group">
                <label>Longitude</label>
                <input type="text" value={longitude} readOnly placeholder="Longitude" />
              </div>
            </div>
            <div className="form-row form-row-center">
              <button className="go-btn form-calc-btn" type="button" onClick={handleFetchCoordinates}>
                Fetch Coordinates
              </button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Roof Area Available <span className="info-icon">i</span></label>
                <div className="input-with-unit">
                  <input type="number" min="0" value={area} onChange={e => setArea(e.target.value)} />
                  <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)}>
                    <option value="sqm">sqm</option>
                    <option value="sqft">sqft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Total Electricity Used (kWh)</label>
                <input type="number" min="0" value={totalElectricity} onChange={e => setTotalElectricity(e.target.value)} placeholder="e.g. 300" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Rate of Cost of Electricity (₹/kWh)</label>
                <input type="number" min="0" value={electricityRate} onChange={e => setElectricityRate(e.target.value)} placeholder="e.g. 8" />
              </div>
            </div>
            <div className="form-row form-row-center">
              <button className="go-btn form-calc-btn" type="submit">Calculate</button>
            </div>
          </form>
        )}
        {activeTab === 'results' && showResult && (
          <div className="prediction-form-card result-card-full">
            <h2 className="form-title">Results</h2>
            <div className="results-top-row results-top-row-centered">
              <div className="results-card results-card-returns">
                <h3 className="results-card-title">Returns</h3>
                <div className="results-list">
                  <div><span>Annual Generation:</span> <b>361.35 kWh</b></div>
                  <div><span>Annual Savings:</span> <b style={{color:'#2ecc71'}}>₹2,529</b></div>
                  <div><span>Payback Period:</span> <b>3.54 years</b></div>
                  <div><span>25-Year ROI:</span> <b style={{color:'#27ae60'}}>1118.18%</b></div>
                </div>
              </div>
            </div>
            <div className="results-mid-row">
              <div className="results-card results-card-wide">
                <h3 className="results-card-title">Cost Breakdown</h3>
                <div className="results-chart-placeholder">
                  <img src="/images/pie-placeholder.png" alt="Pie Chart" style={{width:'180px',height:'180px',objectFit:'contain'}} />
                  <div style={{color:'#aaa',marginTop:'12px'}}>Pie chart placeholder</div>
                </div>
              </div>
              <div className="results-card results-card-wide">
                <h3 className="results-card-title">Return on Investment</h3>
                <div className="results-chart-placeholder">
                  <img src="/images/graph-placeholder.png" alt="ROI Graph" style={{width:'100%',maxWidth:'320px',height:'180px',objectFit:'contain'}} />
                  <div style={{color:'#aaa',marginTop:'12px'}}>Graph placeholder</div>
                </div>
              </div>
            </div>
            <div className="results-bottom-row">
              <div className="results-card results-card-green">
                <div className="results-green-stat">296.31 kg</div>
                <div className="results-green-label">CO₂ reduction per year</div>
              </div>
              <div className="results-card results-card-green">
                <div className="results-green-stat">7407.75 kg</div>
                <div className="results-green-label">CO₂ reduction over 25 years</div>
              </div>
              <div className="results-card results-card-green">
                <div className="results-green-stat">2</div>
                <div className="results-green-label">Equivalent trees planted per year</div>
              </div>
            </div>
            <div className="results-incentives-link">
              <a href="#" className="incentives-link">know further incentives</a>
            </div>
            <div className="form-row form-row-center" style={{marginTop: '32px'}}>
              <button className="go-btn form-calc-btn" type="button">Save My Results</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
