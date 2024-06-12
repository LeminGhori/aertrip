import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-QQLJ0J7GDG"; // your Measurement ID

function RouteChangeTracker() {
    const navigate = useNavigate();

    useEffect(() => {
        ReactGA.initialize(TRACKING_ID);
        const unlisten = navigate.listen((location) => {
            ReactGA.send({ hitType: "pageview", page: location.pathname });
        });

        return () => {
            unlisten();
        };
    }, [navigate]);

    return null;
}

export default RouteChangeTracker;
