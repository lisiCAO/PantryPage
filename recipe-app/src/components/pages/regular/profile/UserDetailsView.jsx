import React from 'react';
import DetailContent from '../../../common/DetailContent';
import Button from '../../../common/Button';
import './UserDetailsView.scss';

const UserDetailsView = ( { onEdit, user }) => {
    const config = {
        title: 'name',
        image: 'imagePath', 
        ignoreFields: ['id', 'password', 'createdAt', 'updatedAt', 'category', 'name'] // 忽略的字段
    };
    
    return (
        <div className="user-details-view">
            <h1 className="user-details-view__title">User Details</h1>
            {/* Display other user details here */}
            <DetailContent data={user} config={config} />
            <Button onClick={onEdit} className="edit-button">
                Edit
            </Button>
        </div>
    );
}

export default UserDetailsView;