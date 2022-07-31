import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import moment from 'moment';

import LocationField from 'components/Dropdown/LocationField';
import ShiftField from 'components/Dropdown/ShiftField';
import TechnicianField from 'components/Ticket/TechnicianField';
import styles from './NormalTabStyle';

const useStyles = makeStyles(styles);

const NormalTab = () => {
  const classes = useStyles();
  const userStatus = useSelector((state) => state.user);
  const [tire, setTire] = useState({
    date: moment().format('YYYY-MM-DD'),
    width: '',
    height: '',
    size: '',
    brand: '',
    price: '',
    year: '',
    firm: '',
    number: '',
    shipping_date: '',
    client: '',
    status: '現貨',
    location: '',
    remarks: '',
    image: '',
  });

  const updateTire = useCallback(
    (state) => {
      setTire({ ...tire, ...state });
    },
    [tire],
  );

  useEffect(() => {
    // createId();
  }, []);

  return (
    <>
      <div className={classes.content}>
        <div className={classes.main}>
          <div className={classes.title}>{'基本資料'}</div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'工單單號：'}</div>
            <div className={classes.fieldText}>{'B202-20220725'}</div>
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'日期：'}</div>
            <div className={classes.fieldText}>{tire.date}</div>
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'結帳技師：'}</div>
            <div className={classes.fieldText}>{userStatus.info.name}</div>
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'維修技師：'}</div>
            <TechnicianField value={tire.remarks} onChange={(remarks) => updateTire({ remarks })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'服務地點：'}</div>
            <LocationField value={tire.remarks} onChange={(remarks) => updateTire({ remarks })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'班別：'}</div>
            <ShiftField value={tire.remarks} onChange={(remarks) => updateTire({ remarks })} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NormalTab;
