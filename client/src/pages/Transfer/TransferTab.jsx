import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TransferCard from './TransferCard';
import { Add, CloudUpload } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Api, AxiosConfig } from 'GlobalDefine';
import { useDispatch, useSelector } from 'react-redux';
import { openSuccessUpdateSnackbar, openErrorSnackbar } from 'redux/actions';

import styles from './transferTabStyle';

const useStyles = makeStyles(styles);

export default function TransferTab() {
  const classes = useStyles();
  const [allData, setAllData] = useState([{ index: 0, number: '', location: '' }]);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user);

  const addBlankCard = () => {
    let arr = [...allData];
    let last = arr.pop();
    if (last) {
      setAllData([...allData, { index: last.index + 1, number: '', location: '' }]);
    } else {
      setAllData([{ index: 0, number: '', location: '' }]);
    }
  };

  const handleDelete = (index) => {
    const newData = allData.filter((el) => el.index !== index);
    setAllData(newData);
  };

  const uploadAllData = async () => {
    let locationEmpty = allData.filter((el) => !el.location);
    if (locationEmpty.length) {
      dispatch(openErrorSnackbar('項目未填完整，請檢查！'));
    } else {
      for (let index = 0; index < allData.length; index++) {
        const data = allData[index];
        try {
          const getOrigin = await axios.get(
            `${Api.Tires.GetTireById}/${data.number}`,
            AxiosConfig.General,
          );
          const result = await axios.post(
            `${Api.Tires.UpdateTireLocation}`,
            { number: data.number, location: data.location },
            AxiosConfig.General,
          );
          if (result.status === 200) {
            const getData = await axios.get(
              `${Api.Tires.GetTireById}/${data.number}`,
              AxiosConfig.General,
            );
            if (getData.status === 200) {
              await axios.post(
                `${Api.Tires.CreateRecord}`,
                {
                  account: userStatus.info.account,
                  type: 'TRANS',
                  query: JSON.stringify(getData.data[0]),
                  diff: JSON.stringify('location'),
                  origin: JSON.stringify(getOrigin.data[0]),
                },
                AxiosConfig.General,
              );
              handleDelete(data.index);
            }
          }
        } catch (error) {
          console.log(error);
          dispatch(openErrorSnackbar('錯誤！請聯繫維護人員'));
        }
      }
      dispatch(openSuccessUpdateSnackbar(`成功上傳${allData.length}筆資料`));
      setAllData([]);
    }
  };

  return (
    <div className={classes.main}>
      {allData.length
        ? allData.map((v) => {
            return (
              <TransferCard
                key={v.index}
                index={v.index}
                handleDelete={handleDelete}
                allData={allData}
                setAllData={setAllData}
              />
            );
          })
        : null}
      <IconButton className={classes.addButton} onClick={addBlankCard}>
        <Add fontSize="large" />
      </IconButton>
      <Button
        className={classes.uploadBtn}
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
        onClick={uploadAllData}
      >
        {'上傳'}
      </Button>
    </div>
  );
}
