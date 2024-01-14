import React, { useState, useEffect, } from 'react';
import RecipeList from './recipes/RecipeList';
import SearchBar from '../../common/Searchbar';
import RecipeDetailsModal from '../../modals/recipes/RecipeDetailsModal';
import ConfirmModal from '../../modals/ConfirmModal';
import ApiService from '../../../services/ApiService';

const UserFavorites = () => {

    const [favorites, setFavorites] = useState([]); // favorites list
    const [selectedFavorite, setSelectedFavorite] = useState(null); // selected Favorite
    const [favoriteToDelete, setFavoriteToDelete] = useState(null); // Favorite to delete

    const [searchTerm, setSearchTerm] = useState(''); // search term
    const [showDetailsModal, setShowDetailsModal] = useState(false); // show/hide details modal
    const [showConfirmModal, setShowConfirmModal] = useState(false); 
    // load initial data
    useEffect(() => {
        ApiService.fetchFavoriteRecipeByUser()
        .then(response => {
            if (Array.isArray(response)) {
                setFavorites(response);
            }
            else {
                console.error('Unable to fetch Favorites.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            setFavorites([]);
        });
    }, []);

    const handleViewDetails = (favorite) => {
        const recipeId = favorite.recipeId;
            ApiService.fetchRecipe(recipeId) 
              .then(data => {
                setSelectedFavorite(data);
                setShowDetailsModal(true);
              })
              .catch(error => {console.error(error)}) // Reset the editing state to close the modal 
    };
    const confirmDelete = (favorite) => {
        setFavoriteToDelete(favorite);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (favoriteToDelete) {
            ApiService.deleteFavorite(favoriteToDelete.id).then(() => {
                setFavorites(favorites.filter(r => r.id !== favoriteToDelete.id));
                setFavoriteToDelete(null);
            });
        }
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setFavoriteToDelete(null);
        setShowConfirmModal(false);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Filter or sort the Favorites list
    const filteredFavorites = favorites.filter(favorite =>
        favorite?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )|| [];

    return (
        <div>
            <div className="top-bar">
                <h1>My Favorites</h1>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <RecipeList recipes={filteredFavorites} onRecipeSelect={handleViewDetails} onDelete={confirmDelete}/>
            {showDetailsModal && (
                <RecipeDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    recipe={selectedFavorite}
                />
            )}
            <ConfirmModal 
                isOpen={showConfirmModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this recipe?"
                onConfirm={handleDeleteConfirmed}
                onCancel={handleCancelDelete}
            />
        </div>
    );
}

export default UserFavorites;