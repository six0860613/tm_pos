import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 150,
  },
}));

const InputTextField = ({ val, valChange, label }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="tire-remarks"
        label={label}
        value={val}
        fullWidth
        variant="outlined"
        onChange={(e) => valChange(e.target.value)}
      />
    </FormControl>
  );
};

InputTextField.propTypes = {
  val: PropTypes.string,
  valChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default InputTextField;
