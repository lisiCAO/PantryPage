import React, { useState, useEffect, useContext } from 'react';
import Button from './../../common/Button';
import Table from './../../layout/Table';
import SearchBar from './../../common/Searchbar';
import CreateIngredientModal from './../../modals/ingredients/CreateIngredientModal';
import EditIngredientModal from './../../modals/ingredients/EditIngredientModal';
import IngredientDetailsModal from './../../modals/ingredients/IngredientDetailsModal';
import ConfirmModal from './../../modals/ConfirmModal';
import ApiService from './../../../services/ApiService';
import { MessageContext } from './../../../contexts/MessageContext';
import './Ingredients.scss';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [editingIngredient, setEditingIngredient] = useState(null);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const { showMessage, hideMessage } = useContext(MessageContext);
    
    // load initial data
    useEffect(() => {
        ApiService.fetchIngredients()
        .then(response => {
            if (Array.isArray(response)) {
                setIngredients(response);
            } else {
                console.error('Unable to fetch ingredients.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // showMessage('error', 'Unable to fetch ingredients.');
            setIngredients([]);
        });
    }, []);

    const handleCreate = async (newIngredient) => {
        await ApiService.createIngredient(newIngredient)
        .then(addedIngredient => {
            setIngredients([...ingredients, addedIngredient]);
            showMessage('success', 'Ingredient created successfully');
        })
    };

    const handleViewDetails = (ingredient) => {
        const ingredientId = ingredient.id;
            ApiService.fetchIngredient(ingredientId) // fetch the recipe details
              .then(data => {
                  setSelectedIngredient(data);
                  setShowDetailsModal(true);
              })
              .catch(error => {console.error(error); setEditingIngredient(null)});   
    };

    
    const handleEditIngredient = (ingredient) => { // open the edit modal
        setEditingIngredient(ingredient);
        setShowDetailsModal(false);
    };

    const saveEditedIngredient = async (updatedIngredientData) => {
        await ApiService.updateIngredient(editingIngredient.id, updatedIngredientData)
            .then(updatedIngredient => {
                setIngredients(ingredients.map(ingredient => 
                    ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
                ));
                showMessage('success', 'Ingredient updated successfully');
            })
    };
    
    const confirmDelete = (ingredient) => {
        setIngredientToDelete(ingredient);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (ingredientToDelete) {
            ApiService.deleteIngredient(ingredientToDelete.id).then(() => {
                setIngredients(ingredients.filter(r => r.id !== ingredientToDelete.id));
                setIngredientToDelete(null);
            });
        }
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setIngredientToDelete(null);
        setShowConfirmModal(false);
    };
    
    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchIngredients(term); // TODO: Implement search
    };

    // Table columns
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
    ];

    // Filter or sort the ingredients list
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())|| []
    );

    return (
        <div>
            <div className="top-bar">
                <Button className="button--add"  onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredIngredients} 
                onViewDetails={handleViewDetails} 
                onDelete={confirmDelete}
            />
            {showCreateModal && (
                <CreateIngredientModal 
                    isOpen={showCreateModal} 
                    onClose={() => {
                        setShowCreateModal(false);
                        hideMessage();}
                    }
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <IngredientDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    ingredient={selectedIngredient}
                    onEdit={handleEditIngredient}
                />
            )}
            {editingIngredient && (
                <EditIngredientModal
                    isOpen={!!editingIngredient}
                    onClose={() => {
                            setEditingIngredient(null); 
                            setShowDetailsModal(false); 
                            hideMessage();
                        }
                    }
                    onEdit={saveEditedIngredient}
                    ingredientData={editingIngredient}
                /> 
            )}
            <ConfirmModal 
                isOpen={showConfirmModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this ingredient?"
                onConfirm={handleDeleteConfirmed}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default Ingredients;
// Path: recipe-app/src/components/pages/Ingredients.jsx