import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

function DateField({ value, onChange, label, required, disabled }) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        disabled={disabled}
        id="search-date"
        value={value}
        type="date"
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      <FormHelperText>{`請選擇${label}`}</FormHelperText>
    </FormControl>
  );
}

DateField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default DateField;
