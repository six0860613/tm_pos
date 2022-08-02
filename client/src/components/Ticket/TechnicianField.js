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

const TechnicianField = ({ val, valChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="tire-remarks"
        label={'技師'}
        value={val}
        fullWidth
        variant="outlined"
        onChange={(e) => valChange(e.target.value)}
      />
    </FormControl>
  );
};

TechnicianField.propTypes = {
  val: PropTypes.string,
  valChange: PropTypes.func.isRequired,
};

export default TechnicianField;
