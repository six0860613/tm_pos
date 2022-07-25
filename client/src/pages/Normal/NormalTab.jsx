import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import { useDispatch, useSelector } from 'react-redux';
import { openSuccessInsertSnackbar, openErrorSnackbar } from 'redux/actions';

import moment from 'moment';

import LocationField from 'components/Dropdown/LocationField';
import ShiftField from 'components/Dropdown/ShiftField';
import TechnicianField from 'components/Ticket/TechnicianField';
import RemarksField from 'components/Dropdown/RemarksField';
import styles from './NormalTabStyle';

const useStyles = makeStyles(styles);

const NormalTab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    // createId();
  }, []);

  const initTire = () => {
    setTire({
      date: new Date().yyyymmdd(),
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
  };

  const checkIdExist = async (Id) => {
    try {
      const result = await axios.get(`${Api.Tires.CheckTireExist}/${Id}`, AxiosConfig.General);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createTire = useCallback(
    async (e) => {
      if (e && e.cancelable) {
        e.preventDefault();
      }
      const { number } = tire;
      const duplicateNumber = await checkIdExist(number);
      if (duplicateNumber) {
        setErrorMsg('編號重複');
        return;
      }
      setErrorMsg('');
      setLoading(true);
      try {
        const result = await axios.post(`${Api.Tires.CreateTire}`, tire, AxiosConfig.General);
        if (result.status === 200) {
          delete tire.image;
          const record = tire;
          axios.post(
            `${Api.Tires.CreateRecord}`,
            {
              account: userStatus.info.account,
              type: 'INSERT',
              query: JSON.stringify(record),
              diff: '',
            },
            AxiosConfig.General,
          );
          dispatch(openSuccessInsertSnackbar());
          initTire();
          setLoading(false);
        } else {
          dispatch(openErrorSnackbar());
          setLoading(false);
        }
      } catch (error) {
        dispatch(openErrorSnackbar());
        console.log(error);
        setLoading(false);
      }
    },
    [tire],
  );

  if (loading) {
    window.scrollTo({ top: 0 });

    return (
      <div style={{ position: 'relative', marginLeft: '50%', left: '-20px' }}>
        <CircularProgress />
      </div>
    );
  }

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
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'備註:'}
            </div>
            <RemarksField value={tire.remarks} onChange={(remarks) => updateTire({ remarks })} />
          </div>
        </div>
        {!isEmpty(errorMsg) && <div className={classes.errorText}>{errorMsg}</div>}
        <div className={classes.uploadButton}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            startIcon={<CloudUpload />}
            onClick={createTire}
          >
            {'上傳'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default NormalTab;
