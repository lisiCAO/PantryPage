import React, {useContext} from 'react';
import CustomForm from '../../../common/CustomForm';
import userConfig from '../../../modals/users/userConfig';
import { MessageContext } from './../../../../contexts/MessageContext';
import Button from '../../../common/Button';
import './UserDetailsEdit.scss';

const UserDetailsEdit = ({ setIsEditing, user, onSubmit }) => {

    const filteredConfig = userConfig.filter(field => {
        if (field.name === 'category') {
            return user && user.category == 'admin'; // only show category field to admin users
        }
        return true;
    });
    const { message, hideMessage } = useContext(MessageContext);
    const handleFormSubmissionSuccess = () => {
        if (message){
            setTimeout(() => {
                setIsEditing(false);
            }, 3000);
        } else {
            setIsEditing(false);
        }
    }

    return (
        <div className="user-details-edit">
            <CustomForm
                config={filteredConfig}
                initialData={user}
                onSubmit={onSubmit}
                mode="edit"
                onSubmissionSuccess={handleFormSubmissionSuccess}
            />
            <Button onClick={() => {setIsEditing(false); hideMessage();}} className="cancel">
                Cancel
            </Button>
        </div>
    );
};

export default UserDetailsEdit;
