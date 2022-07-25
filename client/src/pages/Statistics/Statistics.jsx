import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Backdrop } from '@material-ui/core';
import StatisticsTab from './StatisticsTab';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
  },
  paper: {
    padding: '10px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 5px',
    },
  },
  title: {
    padding: '10px 0px 10px',
    fontSize: '32px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
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

const Statistics = () => {
  const classes = useStyles();
  const userStatus = useSelector((state) => state.user);
  if (isEmpty(userStatus)) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Paper className={classes.paper}>
          <div className={classes.title}>{'統計報表'}</div>
          <StatisticsTab />
        </Paper>
      </Container>
      {userStatus.info.authority === 3 && (
        <Backdrop className={classes.backdrop} open={true}>
          <div className={classes.backdropText}>{'權限不足'}</div>
        </Backdrop>
      )}
    </div>
  );
};

export default Statistics;
