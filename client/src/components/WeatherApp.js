import React from "react";
import WeatherAppDayContainers from "./WeatherAppDayContainers";

export default function WeatherApp() {
  return (
    <>
      <div id="info-grid">
        <div id="weather-app">
          <div id="weather-container">
            <h3 id="weather-header">The Next 5 Days</h3>
            <div id="weather-bottom-line"></div>
            <div id="weather-outer-grid">
              <WeatherAppDayContainers />
              <WeatherAppDayContainers />
              <WeatherAppDayContainers />
              <WeatherAppDayContainers />
              <WeatherAppDayContainers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
