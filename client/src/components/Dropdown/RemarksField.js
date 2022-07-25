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

const RemarksField = ({ value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <TextField
        id="tire-remarks"
        label={'備註'}
        value={value}
        helperText={'新增備註'}
        fullWidth
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};

RemarksField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default RemarksField;
