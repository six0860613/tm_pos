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

const NumberField = ({ value, onChange, disabled, onBlur }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <TextField
        disabled={disabled}
        id="search-number"
        label={'編號'}
        value={value}
        helperText={'請輸入編號'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        required
        onBlur={onBlur}
      />
    </FormControl>
  );
};

NumberField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default NumberField;
