import React from 'react';
import Button from './../common/Button';
import './Navbar.scss';

const Navbar = ({ onLoginClick, isLoggedIn, user, onLogout, navigateTo }) => {
    const handleUserClick = () => {
        navigateTo(user?.category === 'admin' ? 'adminPanel' : 'userProfile');
    };
    const handleLogoClick = () => {
        navigateTo('home');
    }

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src="logo.png" alt="logo" className="navbar__logo-img" />
            </div>
            <div className="navbar__title" onClick={handleLogoClick}>Recipe Web</div>
            {!isLoggedIn ?
                <Button
                    className="navbar__button"
                    onClick={onLoginClick}>
                    Login
                </Button> :
                <>
                    <div className="navbar__user-info" onClick={handleUserClick}>
                        Welcome, {user.email}
                    </div>
                    <Button
                        className="navbar__button"
                        onClick={onLogout}>
                        Logout
                    </Button>
                </>
            }
        </nav>
    );
};

export default Navbar;
