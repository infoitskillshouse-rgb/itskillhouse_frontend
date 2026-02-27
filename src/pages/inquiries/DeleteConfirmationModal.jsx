// src/components/admin/inquiries/DeleteConfirmationModal.jsx
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmationModal = ({ open, handleClose, handleConfirm, itemName = 'inquiry' }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Confirm Deletion
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
