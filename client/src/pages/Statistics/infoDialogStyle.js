const infoDialogStyleStyle = (theme) => ({
  root: {},
  header: {
    padding: '20px 0px 10px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  content: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: 10,
  },
  footer: {
    backgroundColor: 'white',
    padding: '0px 10px 10px',
  },
  table: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    padding: 10,
    marginBottom: 10,
  },
  headerCell: {
    fontSize: 18,
    width: 120,
    minWidth: 120,
    backgroundColor: theme.palette.grey[800],
    color: 'white',
    padding: '12px 20px 8px',
    [theme.breakpoints.down('sm')]: {
      padding: '12px 0px 8px',
      fontSize: 16,
      minWidth: 90,
    },
  },
  bodyCell: {
    fontSize: 16,
    padding: '4px 0px 0px',
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  dateCell: {
    fontSize: 14,
    padding: '4px 0px 0px',
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
  },
  closeButton: {
    margin: theme.spacing(1, 1, 1),
    right: '0px',
  },
});

export default infoDialogStyleStyle;
