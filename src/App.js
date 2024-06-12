import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Layout from "./modules/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Flights from "./pages/Flights/Flights.jsx";
import RouteChangeTracker from './RouteChangeTracker';

function App() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
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
