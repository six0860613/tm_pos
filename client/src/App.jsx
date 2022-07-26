import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserLogin } from 'redux/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Search from 'pages/Search';
import Insert from 'pages/Insert';
import Record from 'pages/Record';
import Transfer from 'pages/Transfer';
import Statistics from 'pages/Statistics';
import Normal from 'pages/Normal';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Header from 'components/Header';
// import Footer from 'components/Footer';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Snackbar from 'components/Snackbar';
import './styles/main.scss';

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[600],
  },
}));

function App() {
  const classes = useStyles();
  const userStatus = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserLogin());
  }, [dispatch, userStatus.isLogin]);

  return (
    <Router history={history}>
      <CssBaseline />
      <div className={classes.root}>
        <PerfectScrollbar>
          <Header title="輪胎大師工單系統" />
          {!userStatus.isLoading && (
            <Switch>
              {userStatus.isLogin && <Search exact path="/search" />}
              {userStatus.isLogin && <Insert exact path="/insert" />}
              {userStatus.isLogin && <Record exact path="/record" />}
              {userStatus.isLogin && <Transfer exact path="/transfer" />}
              {userStatus.isLogin && <Statistics exact path="/statistics" />}
              {userStatus.isLogin && <Normal exact path="/normal" />}
              {userStatus.isLogin && <Home exact path="/" />}
              {userStatus.isLogin && <Redirect to="/" />}
              {!userStatus.isLogin && <Login path="/login" />}
              {!userStatus.isLogin && <Redirect to="/login" component={Login} />}
            </Switch>
          )}
          <Snackbar />
        </PerfectScrollbar>
      </div>
    </Router>
  );
}

export default App;
