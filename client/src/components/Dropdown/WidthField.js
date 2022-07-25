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

function WidthField({ value, onChange }) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="search-width"
        label={'胎寬'}
        value={value}
        helperText={'請輸入胎寬'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        type="number"
        InputLabelProps={{ shrink: true }}
        InputProps={{ inputProps: { min: 155, max: 375, step: 5 } }}
        required
      />
    </FormControl>
  );
}

WidthField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default WidthField;
