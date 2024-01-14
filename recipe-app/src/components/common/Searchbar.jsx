import React from 'react';
import './Searchbar.scss';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search ..."
                className="search-bar__input"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
