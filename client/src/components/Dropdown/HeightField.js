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

const HeightField = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="search-height"
        label={'胎高'}
        value={value}
        helperText={'請輸入胎高'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        // type="number"
        // InputLabelProps={{ shrink: true }}
        // InputProps={{ inputProps: { min: 20, max: 75, step: 5 } }}
        required
      />
    </FormControl>
  );
};

HeightField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default HeightField;
