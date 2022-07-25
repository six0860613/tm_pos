import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import { useDispatch, useSelector } from 'react-redux';
import { openSuccessInsertSnackbar, openErrorSnackbar } from 'redux/actions';
import DateField from 'components/Dropdown/DateField';
import WidthField from 'components/Dropdown/WidthField';
import HeightField from 'components/Dropdown/HeightField';
import SizeField from 'components/Dropdown/SizeField';
import BrandField from 'components/Dropdown/BrandField';
import PriceField from 'components/Dropdown/PriceField';
import YearField from 'components/Dropdown/YearField';
import FirmField from 'components/Dropdown/FirmField';
import NumberField from 'components/Dropdown/NumberField';
// import ClientField from 'components/Dropdown/ClientField';
import StatusField from 'components/Dropdown/StatusField';
import LocationField from 'components/Dropdown/LocationField';
import RemarksField from 'components/Dropdown/RemarksField';
import UploadImage from 'components/Dropdown/UploadImage';
import styles from './InsertTabStyle';

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  return [this.getFullYear(), '-', (mm > 9 ? '' : '0') + mm, '-', (dd > 9 ? '' : '0') + dd].join(
    '',
  );
};

const useStyles = makeStyles(styles);

const InsertTab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user);
  const [tire, setTire] = useState({
    purchase_date: new Date().yyyymmdd(),
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
      purchase_date: new Date().yyyymmdd(),
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

  const createId = async () => {
    try {
      const result = await axios.get(`${Api.Tires.GetTireId}`, AxiosConfig.General);
      if (result.status === 200) {
        updateTire({ number: result.data });
      } else {
        dispatch(openErrorSnackbar());
      }
    } catch (error) {
      dispatch(openErrorSnackbar());
      console.log(error);
    }
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
      <form onSubmit={createTire}>
        <div className={classes.main}>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'上傳圖片:'}</div>
            <UploadImage
              onChange={(image) => {
                updateTire({ image });
              }}
            />
          </div>
          {!isEmpty(tire.image) && (
            <div className={classes.column}>
              <div className={classes.center}>
                <img src={tire.image} className={classes.image} />
              </div>
            </div>
          )}
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'編號:'}
            </div>
            <NumberField value={tire.number} onChange={(number) => updateTire({ number })} />
          </div>
          <div className={classes.column} style={{ justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={createId}
              className={classes.button}
            >
              產生編號
            </Button>
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle}>{'進貨日期:'}</div>
            <DateField
              value={tire.purchase_date}
              onChange={(purchase_date) => updateTire({ purchase_date })}
              label="進貨日期"
              disabled
            />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'胎寬:'}
            </div>
            <WidthField value={tire.width} onChange={(width) => updateTire({ width })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'胎高:'}
            </div>
            <HeightField value={tire.height} onChange={(height) => updateTire({ height })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'尺寸:'}
            </div>
            <SizeField value={tire.size} onChange={(size) => updateTire({ size })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'品牌:'}
            </div>
            <BrandField value={tire.brand} onChange={(brand) => updateTire({ brand })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'價格:'}
            </div>
            <PriceField value={tire.price} onChange={(price) => updateTire({ price })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'年份:'}
            </div>
            <YearField value={tire.year} onChange={(year) => updateTire({ year })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'廠商:'}
            </div>
            <FirmField value={tire.firm} onChange={(firm) => updateTire({ firm })} />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'存貨地點:'}
            </div>
            <LocationField
              value={tire.location}
              onChange={(location) => updateTire({ location })}
            />
          </div>
          <div className={classes.column}>
            <div className={classes.fieldTitle} style={{ paddingBottom: 20 }}>
              {'狀態:'}
            </div>
            <StatusField value={tire.status} onChange={(status) => updateTire({ status })} select />
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
          >
            {'上傳'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default InsertTab;
