import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
  },
}));

function FirmField({ value, onChange }) {
  const classes = useStyles();
  const firms = [
    'K',
    'KF',
    'H',
    'F',
    'LT',
    'LW',
    'L',
    'S',
    'W',
    'Y',
    '王',
    'JP',
    '全',
    'A',
    'P',
    'C',
  ];

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="search-firm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={'廠商'}
        required
      >
        {firms.map((firm) => (
          <MenuItem key={firm} value={firm}>
            {firm}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="demo-simple-select-outlined-label">{'廠商'}</InputLabel>
      <FormHelperText>{'請選擇廠商'}</FormHelperText>
    </FormControl>
  );
}

FirmField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FirmField;
