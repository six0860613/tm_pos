import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Button, DialogTitle, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './infoDialogStyle';
import moment from 'moment';

const useStyles = makeStyles(styles);

const actionTranslate = (action) => {
  if (action === 'DELETE') {
    return '刪除';
  } else if (action === 'INSERT') {
    return '加入';
  }
  return '編輯';
};

const InfoDialog = (props) => {
  const { onClose, data, open } = props;
  const classes = useStyles();

  if (isEmpty(data)) {
    return <></>;
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={classes.root}>
      <Dialog fullWidth onClose={handleClose} open={open} maxWidth="xl">
        <DialogTitle className={classes.header}>
          <div className={classes.title}>{'編輯紀錄資料'}</div>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerCell} align="center">
                    {'編輯人員'}
                  </TableCell>
                  <TableCell className={classes.headerCell} align="center">
                    {'時間'}
                  </TableCell>
                  <TableCell className={classes.headerCell} align="center">
                    {'操作'}
                  </TableCell>
                  <TableCell className={classes.headerCell} align="center">
                    {'輪胎編號'}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.name}
                  </TableCell>
                  <TableCell className={classes.dateCell} align="center">
                    {moment(data.time).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {actionTranslate(data.type)}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.number}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableCell className={classes.headerCell} align="center">
                  {'進貨日期'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'胎寬'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'胎高'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'大小'}
                </TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.purchase_date}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.width}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.height}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.size}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerCell} align="center">
                    {'品牌'}
                  </TableCell>
                  <TableCell className={classes.headerCell} align="center">
                    {'價格'}
                  </TableCell>
                  <TableCell className={classes.headerCell} align="center">
                    {'年份'}
                  </TableCell>
                  <TableCell className={classes.headerCell} align="center">
                    {'廠商'}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.brand}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.price}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.year}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.firm}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableCell className={classes.headerCell} align="center">
                  {'地點'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'出貨日期'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'客戶'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'狀態'}
                </TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.location}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.shipping_date}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.client}
                  </TableCell>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.status}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer component={Paper} elevation={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ minWidth: '100%' }}
                    className={classes.headerCell}
                    align="center"
                  >
                    {'備註'}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.bodyCell} align="center">
                    {data.info.remarks}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.closeButton}
            onClick={onClose}
          >
            {'關閉'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

InfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default InfoDialog;
