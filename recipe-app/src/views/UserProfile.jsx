import React, { useState, useContext } from 'react';
import Sidebar from '../components/layout/Sidebar';
import UserDetails from '../components/pages/regular/UserDetails';
import UserRecipes from '../components/pages/regular/UserRecipes';
import UserReviews from '../components/pages/regular/UserReviews';
import UserFavorites from '../components/pages/regular/UserFavorites';
import { UserContext } from './../contexts/UserContext';
import './UserProfile.scss';

function UserProfile() {
    const [activeTab, setActiveTab] = useState('details');
    const { user } = useContext(UserContext);
    const renderComponent = () => {
        switch (activeTab) {
            case 'details':
                return <UserDetails />;
            case 'recipes':
                return <UserRecipes />;
            case 'reviews':
                return <UserReviews />;
            case 'favorites':
                return <UserFavorites />;
            default:
                return null;
        }
    };

    return (
        <div className="user-profile">
            <div className="user-body">
                <Sidebar setActiveTab={setActiveTab} category={user.category} />
                <div className="content">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
