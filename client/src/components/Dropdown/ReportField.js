import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 160,
  },
}));

function ReportField({ value, onChange }) {
  const classes = useStyles();
  const reportType = ['現貨報表', '出貨報表', '調貨報表', '廠商現貨報表'];

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="search-firm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={'選擇報表'}
        required
      >
        {reportType.map((firm) => (
          <MenuItem key={firm} value={firm}>
            {firm}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="demo-simple-select-outlined-label">{'選擇報表'}</InputLabel>
      <FormHelperText>{'請選擇報表類型'}</FormHelperText>
    </FormControl>
  );
}

ReportField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ReportField;
