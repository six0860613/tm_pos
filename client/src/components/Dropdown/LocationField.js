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

function LocationField({ val, valChange }) {
  const classes = useStyles();
  const locations = ['總廠', '新店', '板橋', '台中', '泰山', '桃園'];
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        id="search-location"
        value={val}
        onChange={(e) => valChange(e.target.value)}
        label={'地點'}
      >
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>{'地點'}</InputLabel>
    </FormControl>
  );
}

LocationField.propTypes = {
  val: PropTypes.string,
  valChange: PropTypes.func.isRequired,
};

export default LocationField;
