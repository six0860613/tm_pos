import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

import LocationField from 'components/Dropdown/LocationField';
import ShiftField from 'components/Dropdown/ShiftField';
import TechnicianField from 'components/Ticket/TechnicianField';
import styles from './BasicTabStyle';

const useStyles = makeStyles(styles);

const BasicTab = (props) => {
  const classes = useStyles();
  const { ticketData, basicInfo, setTicketData } = props;

  const updateBasicInfo = useCallback(
    (v) => {
      let newData = { ...ticketData };
      newData.basicInfo = { ...basicInfo, ...v };
      setTicketData(newData);
    },
    [basicInfo],
  );

  useEffect(() => {
    // createId();
  }, []);

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
                valChange={(repairTechID) => updateBasicInfo({ repairTechID })}
              />
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
