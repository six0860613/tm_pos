import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

const CheckboxLabels = ({ setLabelFunc }) => {
  const [state, setState] = useState({
    purchase_date: false,
    width: false,
    height: false,
    size: false,
    brand: false,
    price: false,
    year: false,
    firm: false,
    number: false,
    shipping_date: false,
    client: false,
    status: false,
    location: false,
    remarks: false,
  });

  const handleChange = (event) => {
    if (event.target.name === 'number' && event.target.checked === true) {
      setState({
        purchase_date: false,
        width: false,
        height: false,
        size: false,
        brand: false,
        price: false,
        year: false,
        firm: false,
        number: true,
        shipping_date: false,
        client: false,
        status: false,
        location: false,
        remarks: false,
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
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.purchase_date}
            onChange={handleChange}
            name="purchase_date"
            color="primary"
          />
        }
        label="進貨日期"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.width} onChange={handleChange} name="width" color="primary" />
        }
        label="胎寬"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.height} onChange={handleChange} name="height" color="primary" />
        }
        label="胎高"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.size} onChange={handleChange} name="size" color="primary" />
        }
        label="尺寸"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.brand} onChange={handleChange} name="brand" color="primary" />
        }
        label="品牌"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.price} onChange={handleChange} name="price" color="primary" />
        }
        label="價格"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.year} onChange={handleChange} name="year" color="primary" />
        }
        label="年份"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.firm} onChange={handleChange} name="firm" color="primary" />
        }
        label="廠商"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.number} onChange={handleChange} name="number" color="primary" />
        }
        label="編號"
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
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.shipping_date}
            onChange={handleChange}
            name="shipping_date"
            color="primary"
          />
        }
        label="出貨日期"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.client} onChange={handleChange} name="client" color="primary" />
        }
        label="出貨對象"
        disabled={state.number}
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.status} onChange={handleChange} name="status" color="primary" />
        }
        label="狀態"
        disabled={state.number}
      />
    </FormGroup>
  );
};

CheckboxLabels.propTypes = {
  setLabelFunc: PropTypes.func,
};

export default CheckboxLabels;
