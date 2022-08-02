import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
  },
}));

function ShiftField({ val, valChange }) {
  const classes = useStyles();
  const locations = ['早班', '晚班'];
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        id="search-location"
        value={val}
        onChange={(e) => valChange(e.target.value)}
        label={'班別'}
      >
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>{'班別'}</InputLabel>
    </FormControl>
  );
}

ShiftField.propTypes = {
  val: PropTypes.string,
  valChange: PropTypes.func.isRequired,
};

export default ShiftField;
