import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
}));

const SelectClientModal = ({ modalOpen, handleModalClose }) => {
  const classes = useStyles();
  console.log('class', classes);
  return (
    <Dialog maxWidth="xl" open={modalOpen} onClose={handleModalClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleModalClose}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SelectClientModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default SelectClientModal;
