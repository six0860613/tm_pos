import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Toolbar, Button, Hidden, Avatar, Container } from '@material-ui/core';
import { Assessment, AddCircle, Search, Edit, LocalShipping, Assignment } from '@material-ui/icons';
import MenuDrawer from './MenuDrawer';
import LoginButton from './LoginButton';
import LogoImg from 'assets/others/logo_round.png';
import styles from './headerStyle';

const useStyles = makeStyles(styles);

const sections = [
  { key: 'search', title: '查詢庫存', url: '/search', itemIcon: <Search /> },
  { key: 'insert', title: '加入庫存', url: '/insert', itemIcon: <AddCircle /> },
  { key: 'record', title: '編輯紀錄', url: '/record', itemIcon: <Edit /> },
  { key: 'transfer', title: '調胎系統', url: '/transfer', itemIcon: <LocalShipping /> },
  { key: 'statistics', title: '統計報表', url: '/statistics', itemIcon: <Assessment /> },
  { key: 'normal', title: '一般工單', url: '/normal', itemIcon: <Assignment /> },
];

const Header = () => {
  const classes = useStyles();
  const userStatus = useSelector((state) => state.user);

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.leftContainer}>
            <Hidden mdUp>
              <MenuDrawer itemList={sections} />
            </Hidden>
          </div>
          <div className={classes.homeButtonContainer}>
            <Button
              component={Link}
              to={{
                pathname: '/',
              }}
              startIcon={<Avatar alt="Logo" src={LogoImg} className={classes.avatar} />}
              className={classes.homeButton}
            >
              {'工單系統'}
            </Button>
          </div>
          <div className={classes.rightContainer}>
            {userStatus.isLogin && (
              <span className={classes.positionText}>
                {`${userStatus.info.position}:${userStatus.info.name}`}
              </span>
            )}
            <LoginButton />
          </div>
        </Container>
      </Toolbar>
      <Hidden smDown>
        <div className={classes.secondaryContainer}>
          <Container maxWidth="lg" className={classes.noPadding}>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
              {sections.map((section) => (
                <Button
                  key={section.title}
                  component={Link}
                  to={{
                    pathname: section.url,
                  }}
                  className={classes.toolbarLink}
                  startIcon={section.itemIcon}
                >
                  {section.title}
                </Button>
              ))}
            </Toolbar>
          </Container>
        </div>
      </Hidden>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
