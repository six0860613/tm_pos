const recordTabStyle = (theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
  searchButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0px',
  },
  center: {
    position: 'relative',
    marginLeft: '50%',
    left: '-20px',
  },
  row: {
    padding: '10px 20px',
  },
});

export default recordTabStyle;
