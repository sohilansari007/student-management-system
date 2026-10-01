import React from 'react';
import './DeleteAlert.css';

const DeleteAlert = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-alert-overlay">
      <div className="delete-alert-content">
        <div className="delete-icon-wrapper">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2>Are you sure?</h2>
        <p>You want to delete this student permanently.</p>
        <p>This action cannot be undone.</p>
        <div className="delete-alert-actions">
          <button className="delete-cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="delete-confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
