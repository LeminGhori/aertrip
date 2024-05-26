import React, { useState, useEffect } from 'react';
import './index.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/images/file.png";
import Profile from "../../assets/images/profile.png";
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useDispatch, useSelector } from 'react-redux';
import { themeColor } from '../../store/action/action';

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isSticky, setIsSticky] = useState(false);
    const theme = useSelector((state) => state.themeReducers);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset >= 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDarkMode = () => {
        dispatch(themeColor(theme === 'light' ? 'dark' : 'light'));
    };

    const layoutContentStyle = location.pathname !== '/' ? { backgroundColor: 'color(display-p3 0 0.62745 0.65882)' } : {};

    return (
        <div className={`layout ${isSticky ? 'sticky' : ''}`} style={{ background: theme == "light" ? 'white' : 'gray' }}>
            <div className='layout-content' style={layoutContentStyle}>
                <div className='layout-logo' onClick={() => { navigate('/') }}>
                    <img src={Logo} alt='company logo' />
                </div>
                <div className='layout-tabs'>
                    <div className='tab-item active'>
                        Flight
                    </div>
                    <div className='tab-item'>
                        Hotel
                    </div>
                    <div className='tab-item'>
                        visa
                    </div>
                    <div className='tab-item'>
                        holidays
                    </div>
                </div>
                <div className="layout-profile">
                    <div className='profile-item overf-p-8' onClick={toggleDarkMode}>
                        {theme === 'dark' ? <Brightness4Icon /> : <LightModeIcon />}
                    </div>
                    <div className='profile-item'>TRIPS</div>
                    <div className='profile-item'>
                        <img src={Profile} alt='profile image' />
                    </div>
                </div>
            </div>
            <Outlet className='center-height' />  {/* This will render the matched child route components */}
            <div className="footer">
                <div className='layout-logo' onClick={() => { navigate('/') }}>
                    <img src={Logo} alt='company logo' width={'200px'} />
                </div>
                <div className='footer-text'>
                    the web copyright my Lemin Ghori.
                </div>
            </div>
        </div>
    );
}

export default Layout;
