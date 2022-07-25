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

function SizeField({ value, onChange }) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="search-size"
        label={'尺寸'}
        value={value}
        helperText={'請輸入尺寸'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        type="number"
        InputLabelProps={{ shrink: true }}
        InputProps={{ inputProps: { min: 13, max: 24, step: 1 } }}
        required
      />
    </FormControl>
  );
}

SizeField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SizeField;
