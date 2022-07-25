import React from 'react';
import { Container, Link, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Message, Facebook } from '@material-ui/icons';
import styles from './footerStyle';

const Copyright = () => {
  return (
    <div style={{ marginTop: '8px', color: 'white', fontSize: '14px' }}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        {'輪胎大師'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
};

const socialItem = [
  {
    name: 'Line',
    icon: Message,
    url: 'https://line.me/R/ti/p/%40xtk9773b',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/tiremaster1123',
  },
];

const useStyles = makeStyles(styles);

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={4} className={classes.block}>
            <div className={classes.blockTitle}>{'新店館'}</div>
            <a href="https://goo.gl/maps/AqYtCmkckp3XjpFe7" className={classes.linkText}>
              {'地址: 新北市新店區溪園路87號'}
            </a>
            <a href="tel:02-22188318" className={classes.linkText}>
              {'電話: 02-22188318'}
            </a>
          </Grid>
          <Grid item xs={12} md={4} className={classes.block}>
            <div className={classes.blockTitle}>{'板橋館'}</div>
            <a href="https://goo.gl/maps/shNXAyCm7iRUdWEG8" className={classes.linkText}>
              {'地址: 新北市板橋區民生路三段170號'}
            </a>
            <a href="tel:02-82524009" className={classes.linkText}>
              {'電話: 02-82524009'}
            </a>
          </Grid>
          <Grid item xs={12} md={4} className={classes.block}>
            <div className={classes.blockTitle}>{'台中館'}</div>
            <a href="https://goo.gl/maps/DbiiaeEZCnAdCYSG8" className={classes.linkText}>
              {'地址: 台中市梧棲區中華路一段1032號之一'}
            </a>
            <a href="tel:04-26632233" className={classes.linkText}>
              {'電話: 04-26632233'}
            </a>
          </Grid>
          <Grid item xs={12} md={4} className={classes.block}>
            <div className={classes.blockTitle}>{'土城館'}</div>
            <a href="https://goo.gl/maps/DbiiaeEZCnAdCYSG8" className={classes.linkText}>
              {'地址: 新北市土城區金城路二段46巷1－9號'}
            </a>
            <a href="tel:02-22705778" className={classes.linkText}>
              {'電話: 02-22705778'}
            </a>
          </Grid>
          <Grid item xs={12} md={4} className={classes.block}>
            <div className={classes.blockTitle}>{'泰山館'}</div>
            <a href="#/" className={classes.linkText}>
              {'地址: 新北市泰山區貴子路7號'}
            </a>
            <a href="tel:02-2904-8866" className={classes.linkText}>
              {'電話: 02-2904-8866'}
            </a>
          </Grid>
          <Grid item xs={12} md={4} className={`${classes.block} ${classes.extraPadding}`}>
            {socialItem.map((item) => (
              <a className={classes.socialItem} href={item.url} key={item.name}>
                <item.icon />
                <span style={{ paddingLeft: 10 }}>{item.name}</span>
              </a>
            ))}
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
