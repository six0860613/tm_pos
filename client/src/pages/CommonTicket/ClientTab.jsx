import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress, Button } from '@material-ui/core';
import { SaveOutlined, CloudDone } from '@material-ui/icons';
// import axios from 'axios';
// import { Api, AxiosConfig } from 'GlobalDefine';

// import { useDispatch } from 'react-redux';
// import { openErrorSnackbar } from 'redux/actions';
import InputTextField from 'components/Ticket/InputTextField';
import SelectClientModal from 'components/Ticket/SelectClientModal';
import styles from './TabStyle';

const useStyles = makeStyles(styles);

const ClientTab = (props) => {
  const classes = useStyles();
  const { ticketData, clientInfo, setTicketData } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  // const dispatch = useDispatch();

  const updateClientInfo = useCallback(
    (v) => {
      let newData = { ...ticketData };
      newData.clientInfo = { ...clientInfo, ...v };
      setTicketData(newData);
    },
    [ticketData],
  );

  useEffect(() => {
    // 查詢技師資料
  }, []);

  return (
    <>
      {ticketData && clientInfo ? (
        <div className={classes.content}>
          <div className={classes.main}>
            <SelectClientModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
            <div className={classes.column}>
              <div className={classes.selectBtnGroup}>
                <Button
                  className={classes.selectBtn}
                  variant="contained"
                  color="primary"
                  startIcon={<CloudDone />}
                  onClick={handleModalOpen}
                >
                  {'讀取客戶'}
                </Button>
                <Button
                  className={classes.selectBtn}
                  variant="contained"
                  color="primary"
                  startIcon={<SaveOutlined />}
                >
                  {'儲存客戶'}
                </Button>
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'車牌：'}</div>
              <InputTextField
                val={clientInfo.licenseNo}
                valChange={(licenseNo) => updateClientInfo({ licenseNo })}
                label="車牌"
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'客戶姓名：'}</div>
              <InputTextField
                val={clientInfo.clientName}
                valChange={(clientName) => updateClientInfo({ clientName })}
                label="客戶姓名"
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'客戶電話：'}</div>
              <InputTextField
                val={clientInfo.clientPhone}
                valChange={(clientPhone) => updateClientInfo({ clientPhone })}
                label="客戶電話"
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'廠牌：'}</div>
              <InputTextField
                val={clientInfo.carBrand}
                valChange={(carBrand) => updateClientInfo({ carBrand })}
                label="廠牌"
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'型號：'}</div>
              <InputTextField
                val={clientInfo.carType}
                valChange={(carType) => updateClientInfo({ carType })}
                label="型號"
              />
            </div>
            <div className={classes.column}>
              <div className={classes.fieldTitle}>{'里程：'}</div>
              <InputTextField
                val={clientInfo.mileage}
                valChange={(mileage) => updateClientInfo({ mileage })}
                label="里程"
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

ClientTab.propTypes = {
  ticketData: PropTypes.object,
  clientInfo: PropTypes.object,
  setTicketData: PropTypes.func,
};

export default ClientTab;
