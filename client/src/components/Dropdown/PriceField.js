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

function PriceField({ value, onChange }) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="search-price"
        label={'價格(百)'}
        value={value}
        helperText={'請輸入價格(百)'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        type="number"
        InputLabelProps={{ shrink: true }}
        InputProps={{ inputProps: { min: 0, step: 1 } }}
        required
      />
    </FormControl>
  );
}

PriceField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default PriceField;
