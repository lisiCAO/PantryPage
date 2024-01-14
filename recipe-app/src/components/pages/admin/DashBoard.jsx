import React, { useState, useEffect } from 'react';
import StatisticsCard from './../../common/StatisticsCard';
import ApiService from './../../../services/ApiService';
const Dashboard = ({ onCardClick }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        ApiService.fetchDashboardData()
            .then(response => {
                setDashboardData(response);
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    }, []);

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    if (!dashboardData) {
        return <div>Loading...</div>; // TODO: Add spinner
    }

    return (
        <div className="dashboard">
            <StatisticsCard title="User Statistics" data={dashboardData.userStats} onClick={() => onCardClick('users')} />
            <StatisticsCard title="Recipe Statistics" data={dashboardData.recipeStats} onClick={() => onCardClick('recipes')} />
            <StatisticsCard title="Ingredient Statistics" data={dashboardData.ingredientStats} onClick={() => onCardClick('ingredients')} />
            <StatisticsCard title="Review Statistics" data={dashboardData.reviewStats} onClick={() => onCardClick('reviews')} />
        </div>
    );
};

export default Dashboard;
