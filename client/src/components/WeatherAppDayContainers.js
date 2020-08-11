import React from "react";

export default function WeatherAppDayContainers() {
  return (
    <div className="weather-inner-grid">
      <div className="weather-grid-item">
        <p className="weather-day text-center"></p>
      </div>
      <div className="weather-grid-item">
        <i className="fas weather-icon"></i>
      </div>
      <div className="weather-grid-item">
        <p className="weather-type"></p>
      </div>
      <div className="weather-grid-item">
        <p className="weather-temp-hi">
          <span></span>&deg;F
        </p>
      </div>
      <div className="weather-grid-item">
        <div id="weather-temp-line"></div>
      </div>
      <div className="weather-grid-item">
        <p className="weather-temp-low">
          <span></span>&deg;F
        </p>
      </div>
    </div>
  );
}
