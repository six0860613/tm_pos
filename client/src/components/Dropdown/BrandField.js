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

function BrandField({ value, onChange }) {
  const classes = useStyles();
  const brands = [
    '',
    'CO-馬牌',
    'PIR-倍耐力',
    'BS-普利司通',
    'YO-橫濱',
    'TO-東洋',
    'NI-日東',
    'GY-固特異',
    'DL-登路普',
    'MA-瑪吉斯',
    'FIR-泛世通',
    'KM-錦湖',
    'FK-大津',
    'MIC-米其林',
    'OT-一般胎',
    'HK-韓泰',
  ];

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        id="search-brand"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={'品牌'}
        required
      >
        {brands.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </Select>
      <InputLabel>{'品牌'}</InputLabel>
      <FormHelperText>{'請選擇品牌'}</FormHelperText>
    </FormControl>
  );
}

BrandField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default BrandField;
