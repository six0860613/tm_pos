const recordResultTableStyle = (theme) => ({
  table: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  headerCell: {
    fontSize: 18,
    width: 120,
    minWidth: 120,
    backgroundColor: theme.palette.grey[800],
    color: 'white',
    padding: '12px 20px 8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
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
});

export default recordResultTableStyle;
