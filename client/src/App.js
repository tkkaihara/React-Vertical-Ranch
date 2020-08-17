import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./css/App.css";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { CampgroundProvider } from "./context/CampgroundContext";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserProvider>
        <CampgroundProvider>
          <div className="App">
            <AppNavbar />
            <ToastContainer limit={2} />
            <Home />
            <Footer />
          </div>
        </CampgroundProvider>
      </UserProvider>
    </>
  );
}

export default App;
