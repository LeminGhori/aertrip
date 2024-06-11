import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Layout from "./modules/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Flights from "./pages/Flights/Flights.jsx";
import ReactGA from 'react-ga4';
import { useEffect } from "react";
const TRACKING_ID = "G-QQLJ0J7GDG"; // your Measurement ID


function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/landingpage", title: "Landing Page" });
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="flights" element={<Flights />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
