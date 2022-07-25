import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Api, AxiosConfig } from 'GlobalDefine';
import Button from '@material-ui/core/Button';
import NumberField from 'components/Dropdown/NumberField';
import LocationField from 'components/Dropdown/LocationField';
import { Delete } from '@material-ui/icons';

import styles from './transferCardStyle';

const useStyles = makeStyles(styles);

export default function TransferCard(props) {
  const { index, handleDelete, allData, setAllData } = props;
  const classes = useStyles();
  const [location, setLocation] = useState('');
  const [data, setData] = useState({
    index: index,
    number: '',
    location: '',
  });

  const getTireLocation = async (Id) => {
    let originalData = [...allData];
    let isRepeat = originalData.filter((el) => el.number === data.number);
    if (isRepeat.length > 1) {
      setLocation('請勿重複輸入編號！');
    } else {
      try {
        const result = await axios.get(`${Api.Tires.GetTireLocation}/${Id}`, AxiosConfig.General);
        setLocation(result.data);
      } catch (error) {
        console.log(error);
        setLocation('');
      }
    }
  };

  const updateData = useCallback(
    (state) => {
      setData({ ...data, ...state });
    },
    [data],
  );

  useEffect(() => {
    if (location || data) {
      let originalData = [...allData];
      let isExist = originalData.filter((el) => el.index === data.index);
      if (isExist.length === 0) {
        setAllData([...originalData, data]);
      } else {
        let newData = originalData.map((v) => {
          if (v.index === data.index) {
            v.number = data.number;
            v.location = data.location;
          }
          return v;
        });
        setAllData(newData);
      }
    }
  }, [location, data]);

  return (
    <div className={classes.card}>
      <div className={classes.cardButtonGroup}>
        <Button
          variant="contained"
          color="default"
          startIcon={<Delete />}
          onClick={() => handleDelete(data.index)}
        >
          {'移除'}
        </Button>
      </div>
      <div className={classes.cardBlock}>
        <div className={classes.cardBlockTitle}>{'輪胎編號'}</div>
        <NumberField
          value={data.number}
          onChange={(number) => updateData({ number })}
          onBlur={() => getTireLocation(data.number)}
        />
      </div>
      <div className={classes.cardBlock}>
        <div className={classes.cardBlockTitle}>{'當前存貨地點'}</div>
        <div className={classes.locationText}>{location ? location : '輸入編號以顯示存貨地點'}</div>
      </div>
      <div className={classes.cardBlock}>
        <div className={classes.cardBlockTitle}>{'目標存貨地點'}</div>
        <LocationField value={data.location} onChange={(location) => updateData({ location })} />
      </div>
    </div>
  );
}

TransferCard.propTypes = {
  index: PropTypes.number,
  handleDelete: PropTypes.func,
  allData: PropTypes.array,
  setAllData: PropTypes.func,
};
