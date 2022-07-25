import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const TicketNoField = ({ value, onChange, disabled, onBlur }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <TextField
        disabled={disabled}
        id="ticketNo"
        label={'工單單號'}
        value={value}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        required
        onBlur={onBlur}
      />
    </FormControl>
  );
};

TicketNoField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default TicketNoField;
