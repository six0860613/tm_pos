import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, IconButton } from '@material-ui/core';
import { CloudDownload, Edit } from '@material-ui/icons';
import { ApiUrl } from 'GlobalDefine';
import EditDialog from './EditDialog';
import styles from './searchResultTableStyle';
import { Scrollbars } from 'rc-scrollbars';
import XlsxPopulate from 'xlsx-populate';
import moment from 'moment';

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

  const handleDownload = async () => {
    const data = [];
    const filename = '庫存資料.xlsx';
    let wb = await XlsxPopulate.fromBlankAsync();
    let tab = wb.sheet(0).name(filename);
    result.forEach((v) => {
      data.push([
        moment(v.purchase_date).format('YYY-MM-DD'),
        v.width,
        v.height,
        v.size,
        v.brand,
        v.price,
        v.year,
        v.firm,
        v.number,
        v.location,
        v.shipping_date ? moment(v.shipping_date).format('YYY-MM-DD') : '',
        v.client,
        v.remark,
      ]);
    });
    const title = [
      '進貨',
      '胎寬',
      '胎高',
      '大小',
      '品牌',
      '價格',
      '年份',
      '廠商',
      '編號',
      '地點',
      '出貨',
      '客戶',
      '備註',
    ];
    // xlsx content
    tab.range('A1:M1').value([title]).style({ horizontalAlignment: 'center' });
    tab
      .range(`A2:M${data.length + 2}`)
      .value(data)
      .style({ horizontalAlignment: 'center' });
    tab.column('A').width(16);
    tab.column('E').width(16);
    tab.column('K').width(16);
    tab.column('M').width(20);
    // file download
    const out = await wb.outputAsync();
    let file = new Blob([out], { type: 'octet/stream' });
    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(file);
    link.click();
  };

  const columns = useMemo(() => {
    return [
      {
        field: 'edit',
        headerName: '編輯',
        width: 70,
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
        width: 120,
        editable: false,
      },
      {
        field: 'width',
        headerName: '胎寬',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'height',
        headerName: '胎高',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'size',
        headerName: '大小',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'brand',
        headerName: '品牌',
        width: 120,
        editable: false,
        sortable: false,
      },
      {
        field: 'price',
        headerName: '價格',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'year',
        headerName: '年份',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'firm',
        headerName: '廠商',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'number',
        headerName: '編號',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'location',
        headerName: '地點',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'shipping_date',
        headerName: '出貨日期',
        width: 120,
        editable: false,
      },
      {
        field: 'client',
        headerName: '客戶',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'status',
        headerName: '狀態',
        width: 100,
        editable: false,
        sortable: false,
      },
      {
        field: 'image',
        headerName: '圖片',
        sortable: false,
        width: 100,
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
        field: 'remarks',
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
      remarks: row.remarks,
    };
  });

  return (
    <>
      <div className={classes.table}>
        <Scrollbars
          autoHeight="true"
          autoHeightMax={365}
          autoHide="true"
          autoHideTimeout={1000}
          autoHideDuration={200}
          universal
          onScroll={(e) => {
            e.stopPropagation();
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            disableColumnMenu={true}
            autoHeight
          />
        </Scrollbars>
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
          <Button
            variant="contained"
            type="button"
            color="primary"
            size="large"
            startIcon={<CloudDownload />}
            onClick={handleDownload}
          >
            {'下載'}
          </Button>
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
