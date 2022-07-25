const insertTabStyle = (theme) => ({
  content: {
    width: '100%',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '15px 0px',
  },
  formControl: {
    minWidth: 120,
  },
  uploadButton: {
    padding: '10px 40px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  column: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: 'auto',
    padding: '5px 0px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '5px 0px 0px 10px',
    },
  },
  fieldTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    width: '110px',
    height: '100%',
    fontSize: '18px',
    paddingRight: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      width: '75px',
    },
  },
  fieldText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    height: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
    paddingLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      width: '75px',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 'auto',
    height: '140px',
    [theme.breakpoints.down('sm')]: {
      height: '120px',
      maxWidth: '100%',
      paddingRight: '15px',
    },
  },
  errorText: {
    padding: '10px 0px 10px',
    textAlign: 'center',
    fontSize: '18px',
    color: 'red',
  },
  title: {
    padding: '10px 0px 0px 0px',
    fontSize: '24px',
    textAlign: 'left',
    width: '80%',
    borderBottom: '1px solid gray',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
    margin: '10px 0',
  },
});

export default insertTabStyle;
