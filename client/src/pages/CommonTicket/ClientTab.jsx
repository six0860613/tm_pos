import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
// import axios from 'axios';
// import { Api, AxiosConfig } from 'GlobalDefine';

// import { useDispatch } from 'react-redux';
// import { openErrorSnackbar } from 'redux/actions';
import InputTextField from 'components/Ticket/InputTextField';
import styles from './TabStyle';

const useStyles = makeStyles(styles);

const ClientTab = (props) => {
  const classes = useStyles();
  const { ticketData, clientInfo, setTicketData } = props;
  // const dispatch = useDispatch();

  const updateClientInfo = useCallback(
    (v) => {
      let newData = { ...ticketData };
      newData.basicInfo = { ...clientInfo, ...v };
      setTicketData(newData);
    },
    [clientInfo],
  );

  useEffect(() => {
    // 查詢技師資料
  }, []);

  return (
    <>
      {ticketData && clientInfo ? (
        <div className={classes.content}>
          <div className={classes.main}>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'車牌：'}</div>
              <div className={classes.fieldText}>{clientInfo.licenseNo}</div>
              <InputTextField
                val={clientInfo.licenseNo}
                valChange={(licenseNo) => updateClientInfo({ licenseNo })}
                label="車牌"
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'客戶姓名：'}</div>
              <div className={classes.fieldText}>{clientInfo.clientName}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'客戶電話：'}</div>
              <div className={classes.fieldText}>{clientInfo.clientPhone}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'廠牌：'}</div>
              <div className={classes.fieldText}>{clientInfo.carBrand}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'型號：'}</div>
              <div className={classes.fieldText}>{clientInfo.carType}</div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'公里：'}</div>
              <div className={classes.fieldText}>{clientInfo.mileage}</div>
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

ClientTab.propTypes = {
  ticketData: PropTypes.object,
  clientInfo: PropTypes.object,
  setTicketData: PropTypes.func,
};

export default ClientTab;
