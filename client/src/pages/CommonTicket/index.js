import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid, Backdrop, AppBar, Tab, Tabs, Card } from '@material-ui/core';
import BasicTab from './BasicTab';
import ClientTab from './ClientTab';
import { isEmpty } from 'lodash';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper: {
    padding: '10px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 5px',
    },
    marginTop: '10px',
    marginBottom: '10px',
  },
  title: {
    padding: '10px 0px 10px',
    fontSize: '32px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  card: {
    boxShadow:
      '0px 2px 4px -1px rgb(0 0 0 / 25%), 0px 4px 5px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 15%)',
  },
  backdrop: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 135,
    zIndex: theme.zIndex.drawer - 1,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      top: 75,
    },
  },
  backdropText: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginTop: 250,
  },
}));

const CommonTicket = () => {
  const classes = useStyles();
  const theme = useTheme();
  const userStatus = useSelector((state) => state.user);

  const [ticketData, setTicketData] = useState({
    basicInfo: {
      ticketNo: '',
      date: '',
      checkoutTechID: '',
      checkoutTechName: '',
      repairTechID: '',
      repairTechName: '',
      location: '',
      shifts: '',
    },
    clientInfo: {},
  });
  const [tabIndex, setTabIndex] = useState(1);

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  // tab切換function
  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  };

  // 初始化資料
  const initTicket = () => {
    setTicketData({
      basicInfo: {
        ticketNo: `${userStatus.info.account}-${moment().format('YYMMDDhhmm')}${
          Math.floor(Math.random() * 889) + 111
        }`,
        date: moment().format('YYYY-MM-DD'),
        checkoutTechID: userStatus.info.account,
        checkoutTechName: userStatus.info.name,
        repairTechID: '',
        repairTechName: '',
        location: '',
        shifts: '',
      },
      clientInfo: {
        licenseNo: '',
        clientName: '',
        clientPhone: '',
        carBrand: '',
        carType: '',
        mileage: '',
      },
    });
  };

  useEffect(() => {
    setTabIndex(0);
    initTicket();
  }, []);

  if (isEmpty(userStatus)) {
    return null;
  }
  return (
    <div className={classes.root}>
      {console.log('ticket:', ticketData)}
      <Grid item xs={12} md={7} style={{ padding: 0, margin: '12px' }}>
        <Paper className={classes.paper}>
          <div className={classes.title}>{'一般工單'}</div>
          <BasicTab
            ticketData={ticketData}
            basicInfo={ticketData.basicInfo}
            setTicketData={setTicketData}
          />
          <AppBar position="static" color="default">
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="tabs"
            >
              <Tab label="客戶資料" {...a11yProps(0)} />
              <Tab label="輪胎更換項目" {...a11yProps(1)} />
              <Tab label="維修保養項目" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <Card className={classes.card}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={tabIndex}
              onChangeIndex={handleChangeIndex}
            >
              <ClientTab
                tabIndex={tabIndex}
                index={0}
                dir={theme.direction}
                ticketData={ticketData}
                clientInfo={ticketData.clientInfo}
                setTicketData={setTicketData}
              />
              <BasicTab tabIndex={tabIndex} index={1} dir={theme.direction} />
              <BasicTab tabIndex={tabIndex} index={2} dir={theme.direction} />
            </SwipeableViews>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} style={{ padding: 0, margin: '12px' }}>
        <Paper className={classes.paper}>
          <div className={classes.title}>{'一般工單'}</div>
          <BasicTab ticketData={ticketData} setTicketData={setTicketData} />
        </Paper>
      </Grid>
      {userStatus.info.authority === 3 && (
        <Backdrop className={classes.backdrop} open={true}>
          <div className={classes.backdropText}>{'權限不足'}</div>
        </Backdrop>
      )}
    </div>
  );
};

export default CommonTicket;
