const tranferCardStyle = (theme) => ({
  card: {
    maxWidth: '1280px',
    width: 'auto',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: '10px',
    padding: '10px 20px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  cardButtonGroup: {
    display: 'flex',
    flexDirection: 'column',
    height: '120px',
    justifyContent: 'space-evenly',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      height: 'auto',
      width: '100%',
    },
  },
  cardBlock: {
    display: 'flex',
    flexDirection: 'column',
    height: '120px',
    justifyContent: 'space-between',
    padding: '10px',
  },
  cardBlockTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '2px 10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  locationText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '800',
    height: '100%',
  },
});

export default tranferCardStyle;
