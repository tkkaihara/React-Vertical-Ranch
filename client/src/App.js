import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./css/App.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { CampgroundProvider } from "./context/CampgroundContext";

function App() {
  return (
    <>
      <CampgroundProvider>
        <div className="App">
          <AppNavbar />
          <Home />
          <Footer />
        </div>
      </CampgroundProvider>
    </>
  );
}

export default App;
