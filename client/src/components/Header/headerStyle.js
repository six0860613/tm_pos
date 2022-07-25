const headerStyle = (theme) => ({
  toolbar: {
    height: '75px',
    backgroundColor: theme.palette.grey[900],
    padding: '8px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px 0px',
    },
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    width: '50px',
  },
  rightContainer: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  homeButtonContainer: {},
  homeButton: {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
    },
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px',
    },
  },
  secondaryContainer: {
    height: '60px',
    backgroundColor: theme.palette.grey[800],
  },
  noPadding: {
    padding: 0,
  },
  toolbarSecondary: {
    height: '60px',
    justifyContent: 'flex-start',
    overflowX: 'auto',
    color: 'white',
  },
  toolbarLink: {
    padding: '8px 16px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
    backgroundColor: '#555555',
    fontSize: '16px',
    lineHeight: 'normal',
  },
  positionText: {
    fontSize: '12px',
    width: '100%',
    justifyContent: 'flex-start',
    color: 'white',
  },
});

export default headerStyle;
