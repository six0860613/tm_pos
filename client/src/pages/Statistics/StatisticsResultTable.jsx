import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@material-ui/core';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Info } from '@material-ui/icons';
import InfoDialog from './InfoDialog';
import styles from './statisticsResultTableStyle';
import moment from 'moment';
import { Scrollbars } from 'rc-scrollbars';

const useStyles = makeStyles(styles);

const StatisticsResultTable = (props) => {
  const classes = useStyles();
  const { data, searchType } = props;
  const [result, setResult] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDataValue, setSelectedDataValue] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [scrollHeight, setScrollHeight] = useState(310);
  const tableRef = useRef();

  const infoOnClick = (value) => {
    setOpenDialog(true);
    setSelectedDataValue(value);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const parseData = [];

    if (searchType === '現貨報表') {
      data.map((item) => {
        parseData.push({
          brand: item.brand,
          client: item.client,
          firm: item.firm,
          height: item.height,
          location: item.location,
          number: item.number,
          price: item.price,
          purchase_date: item.purchase_date,
          remarks: item.remarks,
          shipping_date: item.shipping_date,
          size: item.size,
          status: item.status,
          width: item.width,
          year: item.year,
        });
      });
    }
    if (searchType === '出貨報表') {
      data.map((item) => {
        parseData.push({
          name: item.name,
          time: item.time,
          number: item.number,
          info: item.currentInfo,
        });
      });
    }
    if (searchType === '調貨報表') {
      data.map((item) => {
        parseData.push({
          name: item.name,
          time: item.time,
          number: item.number,
          beforeLocation: item.beforeLocation,
          afterLocation: item.afterLocation,
        });
      });
    }
    if (searchType === '廠商現貨報表') {
      data.map((item) => {
        parseData.push({
          width: item.width,
          height: item.height,
          size: item.size,
          count: item.count,
        });
      });
    }
    setResult(parseData);
    const tableHeight = tableRef.current.clientHeight;
    if (rowsPerPage === 5) {
      setScrollHeight(310);
    } else {
      setScrollHeight(tableHeight);
    }
  }, [data, rowsPerPage, searchType]);

  return (
    <div className={classes.table}>
      {searchType === '現貨報表' ? (
        <>
          <TableContainer component={Paper} elevation={4} style={{ overflow: 'hidden' }}>
            <Scrollbars
              style={{ height: scrollHeight }}
              autoHide="true"
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal
              onScroll={(e) => {
                e.stopPropagation();
              }}
            >
              <Table ref={tableRef}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerCell} align="center">
                      {'進貨'}
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
                    <TableCell className={classes.headerCell} align="center">
                      {'編號'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'地點'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'出貨'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'客戶'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'備註'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(result) &&
                    result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v) => (
                      <TableRow key={v.number}>
                        <TableCell className={classes.bodyCell} align="center">
                          {moment(v.purchase_date).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.width}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.height}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.size}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.brand}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.price}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.year}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.firm}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.number}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.location}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.shipping_date}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.client}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.remarks}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Scrollbars>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={result.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="每頁"
            />
          </TableContainer>
        </>
      ) : null}
      {searchType === '出貨報表' ? (
        <>
          <TableContainer component={Paper} elevation={4} style={{ overflow: 'hidden' }}>
            <Scrollbars
              style={{ height: scrollHeight }}
              autoHide="true"
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal
              onScroll={(e) => {
                e.stopPropagation();
              }}
            >
              <Table ref={tableRef}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerCell} align="center">
                      {'編輯人員'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'編輯時間'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'輪胎編號'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'出貨日期'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'最後地點'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'詳細'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(result) &&
                    result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v) => (
                      <TableRow key={v.time}>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.name}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {moment(v.time).format('YYYY-MM-DD HH:mm:ss')}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.number}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.info.shipping_date}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.info.location}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          <IconButton style={{ margin: 0 }} onClick={() => infoOnClick(v)}>
                            <Info />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Scrollbars>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={result.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="每頁"
            />
          </TableContainer>
          <InfoDialog data={selectedDataValue} open={openDialog} onClose={handleClose} />
        </>
      ) : null}
      {searchType === '調貨報表' ? (
        <>
          <TableContainer component={Paper} elevation={4} style={{ overflow: 'hidden' }}>
            <Scrollbars
              style={{ height: scrollHeight }}
              autoHide="true"
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal
              onScroll={(e) => {
                e.stopPropagation();
              }}
            >
              <Table ref={tableRef}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerCell} align="center">
                      {'編輯人員'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'編輯時間'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'輪胎編號'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'調胎前'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'調胎後'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(result) &&
                    result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v) => (
                      <TableRow key={v.time}>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.name}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {moment(v.time).format('YYYY-MM-DD HH:mm:ss')}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.number}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.beforeLocation}
                        </TableCell>
                        <TableCell className={classes.bodyCell} align="center">
                          {v.afterLocation}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Scrollbars>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={result.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="每頁"
            />
          </TableContainer>
        </>
      ) : null}
      {searchType === '廠商現貨報表' ? (
        <>
          <TableContainer component={Paper} elevation={4} style={{ overflow: 'hidden' }}>
            <Scrollbars
              style={{ height: scrollHeight }}
              autoHide="true"
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal
              onScroll={(e) => {
                e.stopPropagation();
              }}
            >
              <Table ref={tableRef}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerCell} align="center">
                      {'胎寬'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'胎高'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'尺寸'}
                    </TableCell>
                    <TableCell className={classes.headerCell} align="center">
                      {'數量'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(result) &&
                    result
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((v, i) => (
                        <TableRow key={i}>
                          <TableCell className={classes.bodyCell} align="center">
                            {v.width}
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="center">
                            {v.height}
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="center">
                            {v.size}
                          </TableCell>
                          <TableCell className={classes.bodyCell} align="center">
                            {v.count}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </Scrollbars>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={result.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="每頁"
            />
          </TableContainer>
        </>
      ) : null}
    </div>
  );
};

StatisticsResultTable.propTypes = {
  data: PropTypes.array,
  searchType: PropTypes.string,
};

export default StatisticsResultTable;
