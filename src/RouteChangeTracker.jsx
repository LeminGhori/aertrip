import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-QQLJ0J7GDG"; // your Measurement ID

function RouteChangeTracker() {
    const location = useLocation();

    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return null;
}

export default RouteChangeTracker;
