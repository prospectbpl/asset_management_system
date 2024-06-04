import React, { useState, useEffect } from 'react';

const DeleteConfirmationModal = ({ isOpen, itemName, onDelete, onClose, deleteReason, setDeleteReason }) => {
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (isOpen) {
      setDeleteReason(''); // Reset deleteReason to an empty string
    }
  }, [isOpen, setDeleteReason]);


  const handleDelete = async () => {
    try {
      await onDelete(deleteReason); // Pass deletion reason to onDelete function
      onClose(); // Close the modal after deletion
    } catch (error) {
      setError(error); // Handle error if deletion fails
    }
  };

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete the Name :-  <strong>{itemName}</strong>?</p>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter reason for deletion..."
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            ></textarea>
            {/* Additional inputs for providing a reason for deletion */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Confirm Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
