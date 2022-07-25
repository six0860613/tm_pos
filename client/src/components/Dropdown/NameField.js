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

function NameField({ value, onChange, required }) {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="search-name"
        label={'編輯人員'}
        width={100}
        value={value}
        helperText={'請輸入編輯人員'}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </FormControl>
  );
}
NameField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default NameField;
