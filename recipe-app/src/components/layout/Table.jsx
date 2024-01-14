import React from 'react';
import Button from '../common/Button';
import './Table.scss';
const Table = ({ columns, data, onViewDetails, onDelete }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }
    return (
        <table className="table" aria-label="Data table">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>{col.cell(row)}</td>
                        ))}
                        <td>
                            <Button
                                onClick={() => onViewDetails(row)}
                                className="button--view">
                                View
                            </Button>
                            <Button
                                onClick={() => onDelete(row)}
                                className="button--delete">
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

