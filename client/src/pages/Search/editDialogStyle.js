const editDialogStyleStyle = (theme) => ({
  root: {},
  modal: {
    height: 'calc(100vh - 64px);',
  },
  header: {
    padding: '20px 0px 10px',
    textAlign: 'center',
    height: '10%',
    borderBottom: 'solid 1px #e5e5e5',
  },
  title: {
    fontSize: '28px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  content: {
    width: '100%',
    height: '80%',
    overflow: 'auto',
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  searchButton: {},
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '20px 10px',
    height: '10%',
    borderTop: 'solid 1px #e5e5e5',
  },
});

export default editDialogStyleStyle;
