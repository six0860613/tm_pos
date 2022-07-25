import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, IconButton } from '@material-ui/core';
import { CloudDownload, Edit } from '@material-ui/icons';
import { ApiUrl } from 'GlobalDefine';
import CsvDownload from 'react-json-to-csv';
import EditDialog from './EditDialog';
import styles from './searchResultTableStyle';

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  return [this.getFullYear(), '-', (mm > 9 ? '' : '0') + mm, '-', (dd > 9 ? '' : '0') + dd].join(
    '',
  );
};

const useStyles = makeStyles(styles);

const SearchResultTable = (props) => {
  const classes = useStyles();
  const userStatus = useSelector((state) => state.user);
  if (isEmpty(userStatus)) {
    return null;
  }
  const { result, refresh } = props;
  const [openImg, setOpenImg] = useState(false);
  const [number, setNumber] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDataValue, setSelectedDataValue] = useState({});

  const checkFileExist = (url) => {
    if (url) {
      const req = new XMLHttpRequest();
      req.open('GET', url, false);
      req.send();
      return req.status == 200;
    } else {
      return false;
    }
  };

  const editOnClick = (value) => {
    setOpenDialog(true);
    setSelectedDataValue(value);
  };

  const imgOnClick = (value) => {
    setOpenImg(true);
    setNumber(value);
  };

  const handleClose = () => {
    setOpenDialog(false);
    refresh();
  };

  const columns = useMemo(() => {
    return [
      {
        field: 'edit',
        headerName: '編輯',
        width: 110,
        sortable: false,
        editable: false,
        disableClickEventBubbling: true,
        renderCell: function cell(params) {
          return (
            <IconButton
              disabled={userStatus.info.authority === 2 || userStatus.info.authority === 3}
              style={{ margin: 0 }}
              onClick={() => editOnClick(params.row)}
            >
              <Edit />
            </IconButton>
          );
        },
      },
      {
        field: 'purchase_date',
        headerName: '進貨日期',
        width: 140,
        editable: false,
      },
      {
        field: 'width',
        headerName: '胎寬',
        width: 110,
        editable: false,
      },
      {
        field: 'height',
        headerName: '胎高',
        width: 110,
        editable: false,
      },
      {
        field: 'size',
        headerName: '大小',
        width: 110,
        editable: false,
      },
      {
        field: 'brand',
        headerName: '品牌',
        width: 110,
        editable: false,
      },
      {
        field: 'price',
        headerName: '價格',
        width: 110,
        editable: false,
      },
      {
        field: 'year',
        headerName: '年份',
        width: 110,
        editable: false,
      },
      {
        field: 'firm',
        headerName: '廠商',
        width: 110,
        editable: false,
      },
      {
        field: 'number',
        headerName: '編號',
        width: 110,
        editable: false,
      },
      {
        field: 'location',
        headerName: '地點',
        width: 110,
        editable: false,
      },
      {
        field: 'shipping_date',
        headerName: '出貨日期',
        width: 140,
        editable: false,
      },
      {
        field: 'client',
        headerName: '客戶',
        width: 110,
        editable: false,
        sortable: false,
      },
      {
        field: 'status',
        headerName: '狀態',
        width: 110,
        editable: false,
      },
      {
        field: 'image',
        headerName: '圖片',
        sortable: false,
        width: 110,
        editable: false,
        disableClickEventBubbling: true,
        renderCell: function cell(params) {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => imgOnClick(params.row.number)}
            >
              {'預覽'}
            </Button>
          );
        },
      },

      {
        field: 'remark',
        headerName: '備註',
        width: 400,
        sortable: false,
        editable: false,
      },
    ];
  }, []);

  const rows = result.map((row, index) => {
    return {
      id: index,
      purchase_date: new Date(row.purchase_date).yyyymmdd(),
      width: row.width,
      height: row.height,
      size: row.size,
      brand: row.brand,
      price: row.price,
      year: row.year,
      firm: row.firm,
      number: row.number,
      location: row.location,
      shipping_date: isEmpty(row.shipping_date) ? '' : new Date(row.shipping_date).yyyymmdd(),
      client: row.client,
      status: row.status,
      remark: row.remark,
    };
  });

  return (
    <>
      <div className={classes.table}>
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight />
      </div>
      {openImg && (
        <Dialog open={openImg} onClose={() => setOpenImg(false)}>
          {checkFileExist(`${ApiUrl}images/${number}.jpeg`) ? (
            <img src={`${ApiUrl}/images/${number}.jpeg`} className={classes.image} />
          ) : (
            <div className={classes.noData}>{'無資料'}</div>
          )}
        </Dialog>
      )}
      <div className={classes.download}>
        {!isEmpty(result) && (
          <CsvDownload
            filename="庫存資料.csv"
            style={{
              boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
              backgroundColor: '#3f51b5',
              padding: '8px 22px',
              borderRadius: '4px',
              display: 'flex',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '15px',
              textDecoration: 'none',
              border: 0,
            }}
            data={result}
          >
            <CloudDownload />
            <span style={{ paddingLeft: '5px' }}>{'下載'}</span>
          </CsvDownload>
        )}
      </div>
      <EditDialog data={selectedDataValue} open={openDialog} onClose={handleClose} />
    </>
  );
};

SearchResultTable.propTypes = {
  result: PropTypes.array,
  refresh: PropTypes.func,
};

export default SearchResultTable;
