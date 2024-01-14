import React from 'react';
import Button from '../common/Button';
import Modal from './Modal';
import DetailContent from './../common/DetailContent';
import './DetailsModal.scss';

const displayConfig = {
    recipe: {
        title: 'name',              // 标题字段
        image: 'imagePath',         // 图片字段
        instructions: 'instructions', // 指令字段
        ignoreFields: ['id', 'createdBy', 'createdAt'] // 忽略的字段
    },
    ingredient: {
        title: 'name',
        image: 'imagePath',
        ignoreFields: ['id']
    },
    review: {
        title: 'review_title',
        image: 'review_image_path',
        ignoreFields: ['review_id', 'recipe_id', 'user_id']
    },
    user: {
        title: 'name',
        image: 'imagePath',
        ignoreFields: ['id', 'firstName', 'lastName', 'password']
    }
};
const DetailsModal = ({ isOpen, onClose, data, type, onEdit }) => {
    if (!data || !isOpen) return null;

    const config = displayConfig[type];

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="details-modal">
            <DetailContent data={data} config={config} className="detail-content" />
            {onEdit && (
                <Button onClick={() => onEdit(data)} className="button button--edit">
                    Edit
                </Button>
            )}
        </Modal>
    );
};

export default DetailsModal;

// Path: recipe-app/src/components/modals/DetailsModal.jsx