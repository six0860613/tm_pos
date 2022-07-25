import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import { Checkbox, FormGroup, FormControlLabel, useMediaQuery } from '@material-ui/core';

const CheckboxLabels = ({ setLabelFunc }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [state, setState] = useState({
    number: false,
    name: false,
    start_date: false,
    end_date: false,
  });

  const handleChange = (event) => {
    if (event.target.name === 'number' && event.target.checked === true) {
      setState({
        number: true,
        name: false,
        start_date: false,
        end_date: false,
      });
    } else {
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };

  useEffect(() => {
    if (!isEmpty(state)) {
      setLabelFunc(state);
    }
  }, [state]);

  return (
    <FormGroup row={!smDown} column={smDown ? smDown.toString() : undefined}>
      {console.log('sm', smDown)}
      <FormControlLabel
        control={
          <Checkbox checked={state.number} onChange={handleChange} name="number" color="primary" />
        }
        label="編號"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.name} onChange={handleChange} name="name" color="primary" />
        }
        label="編輯人員"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.start_date}
            onChange={handleChange}
            name="start_date"
            color="primary"
          />
        }
        label="起始日期"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.end_date}
            onChange={handleChange}
            name="end_date"
            color="primary"
          />
        }
        label="結束日期"
        disabled={state.number}
      />
    </FormGroup>
  );
};

CheckboxLabels.propTypes = {
  setLabelFunc: PropTypes.func,
};

export default CheckboxLabels;
