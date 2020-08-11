import React from "react";
import GoogleMap from "./GoogleMap";
import WeatherApp from "./WeatherApp";

export default function Information() {
  return (
    <>
      <section id="information" className="home-b-background">
        <div className="container">
          <section id="home-a" className="text-center py-2">
            <h2 className="section-title">Weather and Map</h2>
            <div className="bottom-line"></div>
            <p className="lead">
              Vertical Ranch is located approximately 3.7 miles NE of Salmon La
              Sac Campground.
            </p>
            <div className="container">
              <WeatherApp />
              <GoogleMap />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
