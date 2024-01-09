import React, { useState, useEffect, useContext } from 'react';
import Button from './../../common/Button';
import Table from './../../layout/Table';
import SearchBar from './../../common/Searchbar';
import CreateReviewModal from './../../modals/reviews/CreateReviewModal';
import EditReviewModal from './../../modals/reviews/EditReviewModal';
import ReviewDetailsModal from './../../modals/reviews/ReviewDetailsModal';
import ConfirmModal from './../../modals/ConfirmModal';
import ApiService from './../../../services/ApiService';
import { MessageContext } from './../../../contexts/MessageContext';
import './Reviews.scss';

/**
 * Reviews page component
 *  
 * @returns {JSX.Element}
 * 
 * @example
 * <Reviews />
 * 
 * @category Components
 * 
 * @todo Add error handling
 * 
 */
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [editingReview, setEditingReview] = useState(null);
    const [reviewToDelete, setReviewToDelete] = useState(null); // review to delete

    const [searchTerm, setSearchTerm] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false); 

    const { showMessage, hideMessage } = useContext(MessageContext); // Show/hide message

    // load initial data
    useEffect(() => {
        ApiService.fetchReviews()
        .then(response => {
            if (Array.isArray(response)) {
                setReviews(response);
            } else {
                console.error('Unable to fetch reviews.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            setReviews([]);
        });
    }, []);
    
    const handleCreate = async (newReview) => {
        await ApiService.createReview(newReview)
        .then(addedReview => {
            setReviews([...reviews, addedReview]);
            showMessage('success', 'Review created successfully.');
        })
    };

    const handleViewDetails = (review) => {
        const reviewId = review.id;
            ApiService.fetchReview(reviewId) // Fetch the review details
              .then(data => {
                setSelectedReview(data);
                setShowDetailsModal(true);
              })
              .catch(error => {console.error(error); setEditingReview(null);}) // Handle error
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setShowDetailsModal(false);
    };

    const saveEditedReview = async (updatedReviewData) => {
        await ApiService.updateReview(editingReview.id, updatedReviewData)
            .then(updatedReview => {
                // Update the reviews list with the updated review
                setReviews(reviews.map(review => 
                    review.id === updatedReview.id ? updatedReview : review
                ));
                showMessage('success', 'Review updated successfully.');
            })
    };
    
    const confirmDelete = (review) => {
        setReviewToDelete(review);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (reviewToDelete) {
            ApiService.deleteReview(reviewToDelete.id).then(() => {
                setReviews(reviews.filter(r => r.id !== reviewToDelete.id));
                setReviewToDelete(null);
            });
        }
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setReviewToDelete(null);
        setShowConfirmModal(false);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchReviews(term); // Search reviews
    };

    // Table columns
    const columns = [
        { header: 'Title', cell: (row) => row.recipeName },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Created By', cell: (row) => row.userName },
    ];
    
    // Filter or sort the reviews list
    const filteredReviews = reviews.filter(review =>
        review.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="top-bar">
                <Button className="button--add" onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredReviews} 
                onViewDetails={handleViewDetails} 
                onDelete={confirmDelete}
            />
            {showCreateModal && (
                <CreateReviewModal 
                    isOpen={showCreateModal} 
                    onClose={() => {      
                        setShowCreateModal(false);
                        hideMessage();
                    }} 
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <ReviewDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    review={selectedReview}
                    onEdit={handleEditReview}
                />
            )}
            {editingReview && (
                <EditReviewModal
                    isOpen={!!editingReview}
                    onClose={() => {
                            setEditingReview(null); 
                            setShowDetailsModal(false); 
                            hideMessage();
                        }}
                    onEdit={saveEditedReview}
                    reviewData={editingReview}
                /> 
            )}
            <ConfirmModal 
                isOpen={showConfirmModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this review?"
                onConfirm={handleDeleteConfirmed}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default Reviews;

// Path: recipe-app/src/components/pages/Reviews.jsx