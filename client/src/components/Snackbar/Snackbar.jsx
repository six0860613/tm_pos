import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { notifySnackbar } from 'redux/actions';
import { SnackbarType } from 'GlobalDefine';

export default function CustomizedSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState(SnackbarType.INFO);
  const [message, setMessage] = React.useState('');
  const snackbar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (snackbar.open === true) {
      setOpen(true);
      dispatch(notifySnackbar());
    }
    if (snackbar.type !== type) {
      setType(snackbar.type);
    }
    if (snackbar.message !== message) {
      setMessage(snackbar.message);
    }
  }, [snackbar]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getSeverity = (type) => {
    switch (type) {
      case SnackbarType.INFO:
        return 'info';
      case SnackbarType.SUCCESS:
        return 'success';
      case SnackbarType.WARNING:
        return 'warning';
      case SnackbarType.ERROR:
        return 'error';
      default:
        break;
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
      <Alert onClose={handleClose} severity={getSeverity(type)} elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
