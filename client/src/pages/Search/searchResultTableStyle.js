const searchResultTableStyle = (theme) => ({
  table: {
    width: '100%',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  },
  bodyCell: {
    fontSize: 16,
  },
  image: {
    width: '600px',
    height: 'auto',
    minHeight: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  noData: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    textAlign: 'center',
  },
  download: {
    padding: '20px 30px 10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export default searchResultTableStyle;
