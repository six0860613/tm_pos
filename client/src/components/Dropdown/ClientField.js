import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
  },
}));

function ClientField({ value, onChange, required, disabled }) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        disabled={disabled}
        id="search-client"
        label={'出貨對象'}
        width={100}
        value={value}
        helperText={'請輸入出貨對象'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </FormControl>
  );
}
ClientField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default ClientField;
