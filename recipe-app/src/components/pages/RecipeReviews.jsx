import React, { useState, useEffect, useRef, useContext } from 'react';
import CustomForm from '../common/CustomForm';
import ApiService from '../../services/ApiService';
import { UserContext } from '../../contexts/UserContext';
import { MessageContext } from '../../contexts/MessageContext';
import './RecipeReviews.scss';

const RecipeReviews = ({ recipeId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loader = useRef(null);
    const { isLoggedIn, setShowLoginModal } = useContext(UserContext);
    const { showMessage } = useContext(MessageContext);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const newReviews = await ApiService.fetchReviewsByRecipe(recipeId, page);
            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
            setLoading(false);
        };
        fetchReviews();
    }, [recipeId, page]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderRating = (rating) => {
        const filledStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return filledStars + emptyStars;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            threshold: 1.0,
        });
        const currentLoader = loader.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, []);

    const reviewFormConfig = [
        {
            name: 'rating',
            type: 'number',
            label: 'Rating',
        },
        {
            name: 'comment',
            type: 'textarea',
            label: 'Your Review',
            placeholder: 'Write your review here...',
        },
    ];

    const handleSubmitReview = (reviewData) => {
        if (!isLoggedIn) {
            showMessage('error', 'Please log in to favorite recipes.');
            setShowLoginModal(true);
            return;
        }
        ApiService.createReviewByRecipe(recipeId, reviewData).then((newReview) => {
            setReviews([newReview, ...reviews]);
        });
    };

    const handleSubmissionSuccess = () => {
        console.log('Review submitted successfully!');
        // Additional logic after successful submission, if needed
    };
    return (
        <div className="reviews">
            <CustomForm
                config={reviewFormConfig}
                onSubmit={handleSubmitReview}
                mode="create"
                onSubmissionSuccess={handleSubmissionSuccess}
                className="reviews__form"
            />
            <div className="reviews__list">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <div className="review__rating">{renderRating(review.rating)}</div>
                        <div className="review__content">{review.comment}</div>
                        <div className="review__footer">
                            <span className="review__user">{review.location}</span>
                            <span className="review__date">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={loader} className="reviews__loader" />
            {loading && <p className="reviews__loading">Loading more reviews...</p>}
        </div>
    );
};

export default RecipeReviews;

// Path: recipe-app/src/components/pages/Reviews.jsx