import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, transform, isEqual, isObject, isArray } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import { useDispatch } from 'react-redux';
import { openSuccessUpdateSnackbar, openErrorSnackbar } from 'redux/actions';
import WidthField from 'components/Dropdown/WidthField';
import HeightField from 'components/Dropdown/HeightField';
import SizeField from 'components/Dropdown/SizeField';
import BrandField from 'components/Dropdown/BrandField';
import YearField from 'components/Dropdown/YearField';
import FirmField from 'components/Dropdown/FirmField';
import PriceField from 'components/Dropdown/PriceField';
import LocationField from 'components/Dropdown/LocationField';
import NumberField from 'components/Dropdown/NumberField';
import ClientField from 'components/Dropdown/ClientField';
import DateField from 'components/Dropdown/DateField';
import StatusField from 'components/Dropdown/StatusField';
import RemarksField from 'components/Dropdown/RemarksField';
import UploadImage from 'components/Dropdown/UploadImage';
import { ApiUrl } from 'GlobalDefine';
import styles from './editDialogStyle';

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  return [this.getFullYear(), '-', (mm > 9 ? '' : '0') + mm, '-', (dd > 9 ? '' : '0') + dd].join(
    '',
  );
};

const useStyles = makeStyles(styles);

const difference = (origObj, newObj) => {
  const changes = (newObj, origObj) => {
    let arrayIndexCounter = 0;
    return transform(newObj, function (result, value, key) {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] =
          isObject(value) && isObject(origObj[key]) ? changes(value, origObj[key]) : value;
      }
    });
  };
  return changes(newObj, origObj);
};

const checkFileExist = (url) => {
  if (url) {
    const req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
    return req.status === 200;
  } else {
    return false;
  }
};
const EditDialog = (props) => {
  const { onClose, data, open } = props;

  if (isEmpty(data)) {
    return <></>;
  }

  const classes = useStyles();
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user);
  const disabled = userStatus.info.authority !== 0;
  const [originalData, setOriginalData] = useState({});
  const [result, setResult] = useState({
    number: '',
    width: '',
    height: '',
    size: '',
    brand: '',
    year: '',
    firm: '',
    price: '',
    location: '',
    remarks: '',
    client: '',
    status: '',
    purchase_date: '',
    shipping_date: '',
    image: '',
  });

  const handleClose = () => {
    onClose();
  };

  const updateEditData = useCallback(
    async (e) => {
      if (e && e.cancelable) {
        e.preventDefault();
      }
      if (!isEmpty(result)) {
        try {
          const getOrigin = await axios.get(
            `${Api.Tires.GetTireById}/${data.number}`,
            AxiosConfig.General,
          );
          const res = await axios.post(`${Api.Tires.EditTire}`, result, AxiosConfig.General);
          if (res.status === 200) {
            delete result.image;
            const record = result;
            const diff = [];
            // eslint-disable-next-line no-unused-vars
            for (let [key, value] of Object.entries(difference(originalData, record))) {
              diff.push(`${key}`);
            }
            axios.post(
              `${Api.Tires.CreateRecord}`,
              {
                account: userStatus.info.account,
                type: 'EDIT',
                query: JSON.stringify(record),
                diff: JSON.stringify(diff),
                origin: JSON.stringify(getOrigin.data[0]),
              },
              AxiosConfig.General,
            );
            dispatch(openSuccessUpdateSnackbar());
            handleClose();
          } else {
            dispatch(openErrorSnackbar());
          }
        } catch (error) {
          dispatch(openErrorSnackbar());
          console.log(error);
        }
      }
    },
    [result],
  );

  const deleteData = useCallback(
    async (e) => {
      if (e && e.cancelable) {
        e.preventDefault();
      }
      if (!isEmpty(result)) {
        try {
          const res = await axios.post(`${Api.Tires.DeleteTire}`, result, AxiosConfig.General);
          if (res.status === 200) {
            delete result.image;
            const record = result;
            axios.post(
              `${Api.Tires.CreateRecord}`,
              {
                account: userStatus.info.account,
                type: 'DELETE',
                query: JSON.stringify(record),
                diff: '',
              },
              AxiosConfig.General,
            );
            dispatch(openSuccessUpdateSnackbar());
            handleClose();
          } else {
            dispatch(openErrorSnackbar());
          }
        } catch (error) {
          dispatch(openErrorSnackbar());
          console.log(error);
        }
      }
    },
    [result],
  );

  useEffect(() => {
    setOriginalData({
      number: data.number,
      width: data.width,
      height: data.height,
      size: data.size,
      brand: data.brand,
      year: data.year,
      firm: data.firm,
      price: data.price,
      location: data.location,
      remarks: data.remarks,
      client: data.client,
      status: data.status,
      purchase_date: isEmpty(data.purchase_date) ? '' : new Date(data.purchase_date).yyyymmdd(),
      shipping_date: isEmpty(data.shipping_date) ? '' : new Date(data.shipping_date).yyyymmdd(),
      image: data.image,
    });
    setResult({
      number: data.number,
      width: data.width,
      height: data.height,
      size: data.size,
      brand: data.brand,
      year: data.year,
      firm: data.firm,
      price: data.price,
      location: data.location,
      remarks: data.remarks,
      client: data.client,
      status: data.status,
      purchase_date: isEmpty(data.purchase_date) ? '' : new Date(data.purchase_date).yyyymmdd(),
      shipping_date: isEmpty(data.shipping_date) ? '' : new Date(data.shipping_date).yyyymmdd(),
      image: data.image,
    });
  }, [data]);

  useEffect(() => {
    if (!isEmpty(result.shipping_date)) {
      setResult({ ...result, status: '售出' });
    }
  }, [result.shipping_date]);

  return (
    <div className={classes.root}>
      <Dialog fullWidth maxWidth="xl" onClose={handleClose} open={open}>
        <form className={classes.modal} onSubmit={updateEditData}>
          <DialogTitle className={classes.header}>
            <div className={classes.title}>{'編輯資料'}</div>
          </DialogTitle>
          <DialogContent className={classes.content}>
            <DateField
              value={result.purchase_date}
              onChange={(purchase_date) => setResult({ ...result, purchase_date })}
              label="進貨日期"
              disabled={disabled}
            />
            <WidthField
              value={result.width}
              onChange={(width) => setResult({ ...result, width })}
            />
            <HeightField
              value={result.height}
              onChange={(height) => setResult({ ...result, height })}
            />
            <SizeField value={result.size} onChange={(size) => setResult({ ...result, size })} />
            <BrandField
              value={result.brand}
              onChange={(brand) => setResult({ ...result, brand })}
            />
            <PriceField
              value={result.price.toString()}
              onChange={(price) => setResult({ ...result, price })}
            />
            <YearField
              value={result.year.toString()}
              onChange={(year) => setResult({ ...result, year })}
            />
            <FirmField value={result.firm} onChange={(firm) => setResult({ ...result, firm })} />
            <NumberField
              value={result.number}
              onChange={(number) => setResult({ ...result, number })}
              disabled={disabled}
            />
            <LocationField
              value={result.location}
              onChange={(location) => setResult({ ...result, location })}
              disabled={disabled}
            />
            <DateField
              value={result.shipping_date}
              onChange={(shipping_date) => setResult({ ...result, shipping_date })}
              label="出貨日期"
              required={isEmpty(result.client) ? false : true}
              disabled={disabled}
            />
            <ClientField
              value={result.client}
              onChange={(client) => setResult({ ...result, client })}
              required={isEmpty(result.shipping_date) ? false : true}
              disabled={disabled}
            />
            <StatusField
              value={result.status}
              onChange={(status) => setResult({ ...result, status })}
            />
            <RemarksField
              value={result.remarks}
              onChange={(remarks) => setResult({ ...result, remarks })}
            />
            {result.number && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {isEmpty(result.image) ? (
                    checkFileExist(`${ApiUrl}images/${result.number}.jpeg`) ? (
                      <img
                        src={`${ApiUrl}images/${result.number}.jpeg`}
                        style={{ width: 'auto', height: '140px' }}
                      />
                    ) : (
                      <>{'無圖片資料'}</>
                    )
                  ) : (
                    <img src={result.image} style={{ width: 'auto', height: '140px' }} />
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <UploadImage
                    onChange={(image) => {
                      setResult({ ...result, image });
                    }}
                  />
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions className={classes.footer}>
            {userStatus.info.authority === 0 && (
              <Button
                style={{ backgroundColor: '#d32f2f' }}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Save />}
                type="button"
                onClick={deleteData}
              >
                {'刪除'}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Save />}
              type="submit"
            >
              {'儲存'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditDialog;
