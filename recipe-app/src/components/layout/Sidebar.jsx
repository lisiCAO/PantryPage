import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ setActiveTab, category}) => {
    const renderMenuItems = () => {
        if (category === "admin") {
            return (
                <>
                    <li onClick={() => setActiveTab('dashboard')} className="sidebar__menu__item">Dashboard</li>
                    <li onClick={() => setActiveTab('recipes')} className="sidebar__menu__item">Recipes</li>
                    <li onClick={() => setActiveTab('users')} className="sidebar__menu__item">Users</li>
                    <li onClick={() => setActiveTab('ingredients')} className="sidebar__menu__item">Ingredients</li>
                    <li onClick={() => setActiveTab('reviews')} className="sidebar__menu__item">Reviews</li>
                </>
            );
        } else {
            return (
                <>
                    <li onClick={() => setActiveTab('details')} className="sidebar__menu__item">Details</li>
                    <li onClick={() => setActiveTab('recipes')} className="sidebar__menu__item">My Recipes</li>
                    <li onClick={() => setActiveTab('reviews')} className="sidebar__menu__item">My Reviews</li>
                    <li onClick={() => setActiveTab('favorites')} className="sidebar__menu__item">Favorites</li>
                </>
            );
        }
    };

    return (
        <div className="sidebar">
            <ul className="sidebar__menu">
                {renderMenuItems()}
            </ul>
        </div>
    );
};

export default Sidebar;
