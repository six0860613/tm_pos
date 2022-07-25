import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import BackgroundImage from 'assets/others/background.png';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
  card: {
    color: 'white',
    height: '600px',
    padding: '30px',
    backgroundImage: `url(${BackgroundImage})`,
    opacity: 0.8,
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '400px',
    },
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg" className={classes.container}>
      <div className={classes.card}>
        <div className={classes.title}>
          {'歡迎光臨'}
          <br />
          {'輪胎大師工單系統'}
        </div>
      </div>
    </Container>
  );
};

export default Home;
