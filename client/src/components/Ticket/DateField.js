import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
}));

function DateField({ value, onChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <TextField
        id="search-date"
        value={value}
        type="date"
        label="日期"
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        style={{ color: 'black' }}
      />
    </FormControl>
  );
}

DateField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

export default DateField;
