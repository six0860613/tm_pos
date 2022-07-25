const menuDrawerStyle = (theme) => ({
  drawer: {
    width: 250,
  },
  list: {
    padding: 0,
  },
  iconButton: {
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
    width: '50px',
    height: '50px',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px',
    },
  },
  paper: {
    backgroundColor: theme.palette.grey[800],
  },
  divider: {
    backgroundColor: 'white',
    marginBottom: '15px',
  },
  listIcon: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: '18px',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  listTitle: {
    padding: '27px 0px',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0px',
      fontSize: '20px',
    },
  },
});

export default menuDrawerStyle;
