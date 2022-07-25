const footerStyle = (theme) => ({
  footer: {
    backgroundColor: theme.palette.grey[800],
    padding: '20px 10px',
    fontFamily: 'Roboto, sans-serif',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0px',
    },
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 10px',
    },
  },
  blockTitle: {
    fontSize: '26px',
    color: 'white',
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      paddingBottom: '0px',
    },
  },
  linkText: {
    color: '#bbdefb',
    textDecoration: 'none',
    fontSize: '17px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
  },
  socialItem: {
    color: '#bbdefb',
    textDecoration: 'none',
    display: 'flex',
  },
  extraPadding: {
    paddingTop: 55,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 10,
    },
  },
});

export default footerStyle;
