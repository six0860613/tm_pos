import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Api, AxiosConfig } from 'GlobalDefine';

import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from 'redux/actions';

import LocationField from 'components/Dropdown/LocationField';
import ShiftField from 'components/Dropdown/ShiftField';
import TechnicianField from 'components/Ticket/TechnicianField';
import styles from './TabStyle';

const useStyles = makeStyles(styles);

const BasicTab = (props) => {
  const classes = useStyles();
  const { ticketData, basicInfo, setTicketData } = props;
  const dispatch = useDispatch();

  const [techID, setTechID] = useState('');

  const updateBasicInfo = useCallback(
    (v) => {
      let newData = { ...ticketData };
      newData.basicInfo = { ...basicInfo, ...v };
      setTicketData(newData);
    },
    [basicInfo],
  );

  const getUserName = async (id) => {
    try {
      const result = await axios.get(`${Api.Ticket.GetUserInfo}/${id}`, AxiosConfig.General);
      if (result.status === 200) {
        if (result.data !== 'Not Found.' && result.data.email === basicInfo.repairTechID) {
          updateBasicInfo({ repairTechName: result.data.name });
          if (result.data.position !== '技師') {
            dispatch(openErrorSnackbar('提醒：此編號非技師帳號'));
          }
        }
        if (result.data === 'Not Found.') updateBasicInfo({ repairTechName: '查無此技師' });
      } else {
        dispatch(openErrorSnackbar('錯誤：請聯繫維護人員！'));
      }
    } catch (error) {
      dispatch(openErrorSnackbar('錯誤：請聯繫維護人員！'));
      console.log(error);
    }
  };

  useEffect(() => {
    // 查詢技師資料
    if (techID) {
      getUserName(techID.toString());
    }
  }, [techID]);

  return (
    <>
      {ticketData && basicInfo ? (
        <div className={classes.content}>
          <div className={classes.main}>
            <div className={classes.title}>{'基本資料'}</div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'工單單號：'}</div>
              <div className={classes.fieldText}>{basicInfo.ticketNo}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'日期：'}</div>
              <div className={classes.fieldText}>{basicInfo.date}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'結帳技師：'}</div>
              <div className={classes.fieldText}>
                {basicInfo.checkoutTechID}({basicInfo.checkoutTechName})
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'維修技師：'}</div>
              <TechnicianField
                val={basicInfo.repairTechID}
                valChange={(repairTechID) => {
                  updateBasicInfo({ repairTechID });
                  setTechID(repairTechID);
                }}
              />
              <div className={classes.fieldText}>{basicInfo.repairTechName}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'服務地點：'}</div>
              <LocationField
                val={basicInfo.location}
                valChange={(location) => updateBasicInfo({ location })}
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'班別：'}</div>
              <ShiftField
                val={basicInfo.shifts}
                valChange={(shifts) => updateBasicInfo({ shifts })}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative', marginLeft: '50%', left: '-20px' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

BasicTab.propTypes = {
  ticketData: PropTypes.object,
  basicInfo: PropTypes.object,
  setTicketData: PropTypes.func,
};

export default BasicTab;
