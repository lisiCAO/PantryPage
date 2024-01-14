import React, { useState, useEffect, useContext } from 'react';
import Button from './../../common/Button';
import Table from './../../layout/Table';
import SearchBar from './../../common/Searchbar';
import CreateRecipeModal from './../../modals/recipes/CreateRecipeModal';
import EditRecipeModal from './../../modals/recipes/EditReipeModal';
import RecipeDetailsModal from './../../modals/recipes/RecipeDetailsModal';
import ConfirmModal from './../../modals/ConfirmModal';
import ApiService from './../../../services/ApiService';
import { MessageContext } from './../../../contexts/MessageContext';
import './Recipes.scss';

/** 
 * Recipes page component
 * 
 * @returns {JSX.Element}
 * 
 * @example
 * <Recipes />
 * 
 * @category Components
 * 
 */
const Recipes = () => {

    const [recipes, setRecipes] = useState([]);                     // recipes list
    const [selectedRecipe, setSelectedRecipe] = useState(null);     // selected recipe
    const [editingRecipe, setEditingRecipe] = useState(null);       // editing recipe
    const [recipeToDelete, setRecipeToDelete] = useState(null);     // recipe to delete

    const [searchTerm, setSearchTerm] = useState('');               // search term

    const [showCreateModal, setShowCreateModal] = useState(false);  // show/hide create modal
    const [showDetailsModal, setShowDetailsModal] = useState(false);// show/hide details modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);


    const { showMessage, hideMessage } = useContext(MessageContext);// Show/hide message

    // load initial data
    useEffect(() => {
        ApiService.fetchRecipes()
            .then(response => {
                if (Array.isArray(response)) {
                    setRecipes(response);
                }
                else {
                    console.error('Unable to fetch recipes.');
                    return [];
                }
            })
            .catch(error => {
                console.error(error);
                setRecipes([]);
            });
    }, []);

    const handleCreate = async (newRecipe) => { // async/await
        const addedRecipe = await ApiService.createRecipe(newRecipe);
        setRecipes([...recipes, addedRecipe]);
        showMessage('success', 'Recipe created successfully');
    }

    const handleViewDetails = (recipe) => {
        const recipeId = recipe.id;
        ApiService.fetchRecipe(recipeId)
            .then(data => {
                setSelectedRecipe(data);
                setShowDetailsModal(true);
            })
            .catch(error => { console.error(error); setEditingRecipe(null); })
    };

    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
        setShowDetailsModal(false);
    };

    const saveEditedRecipe = async (updatedRecipeData) => {
        const updatedRecipe = await ApiService.updateRecipe(editingRecipe.id, updatedRecipeData);
        setRecipes(recipes.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ));
        showMessage('success', 'Recipe updated successfully');
    };

    const confirmDelete = (recipe) => {
        setRecipeToDelete(recipe);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (recipeToDelete) {
            ApiService.deleteRecipe(recipeToDelete.id).then(() => {
                setRecipes(recipes.filter(r => r.id !== recipeToDelete.id));
                setRecipeToDelete(null);
            });
        }
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setRecipeToDelete(null);
        setShowConfirmModal(false);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchRecipes(term); // TODO: Implement search
    };

    // Filter or sort the recipes list
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Table columns
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
        { header: 'Created By', cell: (row) => row.createdBy },
    ];

    return (
        <div>
            <div className="top-bar">
                <Button className="button--add" onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            {/* <Message message = {message}/> */}
            <Table
                columns={columns}
                data={filteredRecipes}
                onViewDetails={handleViewDetails}
                onDelete={confirmDelete}
            />
            {showCreateModal && (
                <CreateRecipeModal
                    isOpen={showCreateModal}
                    onClose={() => {
                        setShowCreateModal(false);
                        hideMessage();
                    }
                    }
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <RecipeDetailsModal
                    isOpen={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    recipe={selectedRecipe}
                    onEdit={handleEditRecipe}
                />
            )}
            {editingRecipe && (
                <EditRecipeModal
                    isOpen={editingRecipe}
                    onClose={() => {
                        setEditingRecipe(null);
                        setShowDetailsModal(false);
                        hideMessage();
                    }}
                    onEdit={saveEditedRecipe}
                    recipeData={editingRecipe}
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
};

export default Recipes;

// Path: recipe-app/src/components/pages/Recipes.jsx