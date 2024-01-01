import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';

const Reviews = ({ recipeId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const newReviews = await ApiService.fetchReviewsByRecipe(recipeId, page);
            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
            setLoading(false);
        };
        fetchReviews();
    },[recipeId, page]);

    useEffect(() => {
        const observer = new intersectionObserver(handleObserver, {
            root: null,
            threshold: 1.0,
        });
        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    },[]);

    const handleSubmitReview = (reviewData) => {
        // 提交评论逻辑
        ApiService.addReview(recipeId, reviewData).then((newReview) => {
            setReviews([newReview, ...reviews]);
        });
    };
    
    return (
        <div className = "reviews-container">
            {/* content */}
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    {/* single review */}
                </div>
            ))}
            <div ref={loader} />
            {loading && <p>Loading more reviews...</p>}
        </div>
    )


}