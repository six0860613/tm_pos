import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
  },
}));

const authLv0 = ['', '現貨', '預留', '售出', '退胎'];
const authLv1 = ['售出', '退胎'];

const StatusField = ({ value, onChange, select }) => {
  const userStatus = useSelector((state) => state.user);
  const classes = useStyles();
  const status =
    userStatus.info.authority === 0
      ? authLv0
      : userStatus.info.authority === 1
      ? value === '現貨' || value === '售出'
        ? [value, '退胎']
        : authLv1
      : [value];
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        id="search-location"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={'狀態'}
      >
        {select && (
          <MenuItem key={'現貨'} value={'現貨'}>
            {'現貨'}
          </MenuItem>
        )}
        {!select &&
          status.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
      </Select>
      <InputLabel>{'狀態'}</InputLabel>
      <FormHelperText>{'請選擇狀態'}</FormHelperText>
    </FormControl>
  );
};

StatusField.propTypes = {
  value: PropTypes.string,
  select: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default StatusField;
