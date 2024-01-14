import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Recipes from '../components/pages/admin/Recipes';
import Users from '../components/pages/admin/Users';
import Ingredients from '../components/pages/admin/Ingredients';
import Reviews from '../components/pages/admin/Reviews';
import './AdminPanel.scss';
import DashBoard from "../components/pages/admin/DashBoard";

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard'); // Default to 'recipes' tab

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashBoard onCardClick={setActiveTab} />;
            case 'recipes':
                return <Recipes />;
            case 'users':
                return <Users />;
            case 'ingredients':
                return <Ingredients />;
            case 'reviews':
                return <Reviews />;
            // Add cases for other tabs as they become functional
            default:
                return <div>Select a tab</div>;
        }
    };
    return (
        <div className="admin-panel">
            <div className="admin-body">
                <Sidebar setActiveTab={setActiveTab} category={'admin'} />
                <div className="admin-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
