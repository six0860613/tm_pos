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
import styles from './recordResultTableStyle';
import moment from 'moment';
import { Scrollbars } from 'rc-scrollbars';

const useStyles = makeStyles(styles);

const actionTranslate = (action) => {
  switch (action) {
    case 'DELETE':
      return '刪除';
    case 'INSERT':
      return '加入';
    case 'EDIT':
      return '編輯';
    case 'TRANS':
      return '調胎';
    default:
      break;
  }
};

const RecordResultTable = (props) => {
  const classes = useStyles();
  const { data, refresh } = props;
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
    refresh();
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
    data.map((item) => {
      parseData.push({
        name: item.name,
        time: item.time,
        type: item.type,
        info: JSON.parse(item.query),
        diff: !isEmpty(item.difference) ? JSON.parse(item.difference) : [],
      });
    });
    setResult(parseData);
    const tableHeight = tableRef.current.clientHeight;
    if (rowsPerPage === 5) {
      setScrollHeight(310);
    } else {
      setScrollHeight(tableHeight);
    }
  }, [data, rowsPerPage]);

  return (
    <div className={classes.table}>
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
                  {'時間'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'操作'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'輪胎編號'}
                </TableCell>
                <TableCell className={classes.headerCell} align="center">
                  {'詳細'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(result) &&
                result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.time}>
                    <TableCell className={classes.bodyCell} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      {moment(row.time).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      {actionTranslate(row.type)}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      {row.info.number}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      <IconButton style={{ margin: 0 }} onClick={() => infoOnClick(row)}>
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
    </div>
  );
};

RecordResultTable.propTypes = {
  data: PropTypes.array,
  refresh: PropTypes.func,
};

export default RecordResultTable;
