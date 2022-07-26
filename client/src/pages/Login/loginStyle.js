const loginStyle = (theme) => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 20px',
    },
    backgroundColor: '#666666',
  },
  paper: {
    padding: '20px',
    maxWidth: '400px',
    backgroundColor: 'white',
  },
  container: {
    padding: '50px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  avatar: {
    margin: '10px',
    backgroundColor: '#3d4977',
  },
  title: {
    fontSize: '24px',
  },
  form: {
    width: '100%',
    padding: '20px 0px',
  },
  submit: {},
  errorText: {
    color: 'red',
  },
  text: {
    padding: '20px 0px 0px',
    textAlign: 'center',
  },
});

export default loginStyle;
