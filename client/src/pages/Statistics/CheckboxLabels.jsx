import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import { Checkbox, FormGroup, FormControlLabel, useMediaQuery } from '@material-ui/core';

const CheckboxLabels = ({ setLabelFunc, dateCheckDisabled }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [state, setState] = useState({
    report: false,
    location: false,
    start_date: false,
    end_date: false,
  });

  const handleChange = (event) => {
    if (event.target.name === 'number' && event.target.checked === true) {
      setState({
        report: false,
        location: false,
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

  useEffect(() => {
    if (dateCheckDisabled) {
      let newState = { ...state };
      newState.start_date = false;
      newState.end_date = false;
      setLabelFunc(newState);
      setState(newState);
    }
  }, [dateCheckDisabled]);

  return (
    <FormGroup row={!smDown} column={smDown ? smDown.toString() : undefined}>
      <FormControlLabel
        control={
          <Checkbox checked={state.report} onChange={handleChange} name="report" color="primary" />
        }
        label="報表類型"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.location}
            onChange={handleChange}
            name="location"
            color="primary"
          />
        }
        label="地點"
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
        disabled={dateCheckDisabled}
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
        disabled={dateCheckDisabled}
      />
    </FormGroup>
  );
};

CheckboxLabels.propTypes = {
  setLabelFunc: PropTypes.func,
  dateCheckDisabled: PropTypes.bool,
};

export default CheckboxLabels;
