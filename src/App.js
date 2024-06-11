import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Layout from "./modules/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Flights from "./pages/Flights/Flights.jsx";
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-QQLJ0J7GDG"; // your Measurement ID

function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
}

function App() {
  usePageViews();

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
