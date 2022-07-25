import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import styles from './menuDrawerStyle';

const useStyles = makeStyles(styles);

const MenuDrawer = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { itemList } = props;

  return (
    <>
      <IconButton className={classes.iconButton} onClick={() => setOpen(true)}>
        <Menu style={{ color: 'white' }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        classes={{ paper: classes.paper }}
      >
        <div
          className={classes.drawer}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <div className={classes.listTitle}>{'目錄'}</div>
          <Divider classes={{ root: classes.divider }} />
          {itemList.map((item) => (
            <List className={classes.list} key={item.key}>
              <ListItem button component="a" href={item.url}>
                <ListItemIcon className={classes.listIcon}>{item.itemIcon}</ListItemIcon>
                <ListItemText className={classes.listItem}>
                  <div className={classes.text}>{item.title}</div>
                </ListItemText>
              </ListItem>
            </List>
          ))}
        </div>
      </Drawer>
    </>
  );
};

MenuDrawer.propTypes = {
  itemList: PropTypes.array,
};

export default MenuDrawer;
