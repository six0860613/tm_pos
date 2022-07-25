import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';
import { FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
  },
}));

function YearField({ value, onChange }) {
  const classes = useStyles();
  // const minYear = 2008;
  // const maxYear = new Date().getFullYear();

  // const years = new Array(maxYear - minYear + 1)
  //   .fill(minYear)
  //   .map((y, i) => `${y + i}`.substr(2, 2));

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      {/* <Select
        id="search-year"
        label={'年份'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>{'年份'}</InputLabel>
      <FormHelperText>{'請選擇年份'}</FormHelperText> */}
      <TextField
        id="search-year"
        label={'年份'}
        value={value}
        helperText={'請輸入年份'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        // type="number"
        // InputLabelProps={{ shrink: true }}
        // InputProps={{ inputProps: { min: 20, max: 75, step: 5 } }}
        required
      />
    </FormControl>
  );
}

YearField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default YearField;
