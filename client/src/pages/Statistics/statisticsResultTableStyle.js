const statisticsResultTableStyle = (theme) => ({
  table: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  headerCell: {
    fontSize: 14,
    width: 80,
    minWidth: 80,
    backgroundColor: theme.palette.grey[800],
    color: 'white',
    padding: '12px 20px 8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  bodyCell: {
    fontSize: 12,
    padding: '4px 0px 0px',
    height: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
});

export default statisticsResultTableStyle;
