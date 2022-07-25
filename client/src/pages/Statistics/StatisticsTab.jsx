import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { isEmpty, isArray, orderBy } from 'lodash';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search, CloudDownload } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import CheckboxLabels from './CheckboxLabels';
import DateField from 'components/Dropdown/DateField';
import LocationField from 'components/Dropdown/LocationField';
import ReportField from 'components/Dropdown/ReportField';
import StatisticsResultTable from './StatisticsResultTable';
import styles from './statisticsTabStyle';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from 'redux/actions';
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

export default function SearchTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showResult, setShowResult] = useState(false);
  const [search, setSearch] = useState({
    report: '',
    location: '',
    start_date: '',
    end_date: '',
  });

  const [labels, setLabels] = useState({
    report: false,
    location: false,
    start_date: false,
    end_date: false,
  });

  const [loading, setLoading] = useState(false);

  const updateSearchArgs = useCallback(
    (state) => {
      setSearch({ ...search, ...state });
      setShowResult(false);
    },
    [search],
  );

  const [searchResult, setSearchResult] = useState([]);
  const [dateCheckDisabled, setDateCheckDisabled] = useState(false);

  const startSearch = useCallback(
    async (e) => {
      setLoading(true);
      if (e && e.cancelable) {
        e.preventDefault();
      }
      try {
        let submit = { report: '', location: '', start_date: '', end_date: '' };
        if (labels.report === true) submit.report = search.report;
        if (labels.location === true) submit.location = search.location;
        if (labels.start_date === true) submit.start_date = search.start_date;
        if (labels.end_date === true) submit.end_date = search.end_date;
        if (!search.report) {
          dispatch(openErrorSnackbar('請先選擇報表類型！'));
        } else {
          const result = await axios.post(
            `${Api.Tires.GetStatistics}`,
            submit,
            AxiosConfig.General,
          );
          console.log('data', result);

          if (search.report == '現貨報表') setSearchResult(result.data);

          if (search.report == '出貨報表') {
            let filterData = [];
            result.data.forEach((el) => {
              let originData = el.origin ? JSON.parse(el.origin) : '';
              let afterEdit = el.query ? JSON.parse(el.query) : '';
              let diff = el.difference ? JSON.parse(el.difference) : [];
              if (diff.includes('status') && afterEdit) {
                // 原始資料狀態為現貨改為售出才屬於【出貨】
                if (originData && originData.status === '現貨' && afterEdit.status === '售出') {
                  // 有選擇地點時篩選該地點資料，地點為空值時顯示全部
                  if (afterEdit.location === search.location || search.location === '') {
                    filterData.push({
                      name: el.name,
                      number: el.number,
                      originData,
                      currentInfo: afterEdit,
                      time: el.time,
                      type: el.type,
                    });
                  }
                }
              }
            });
            setSearchResult(filterData);
          }

          if (search.report == '調貨報表') {
            let filterData = [];
            result.data.forEach((el) => {
              let beforeLocation = el.origin ? JSON.parse(el.origin).location : '';
              let afterLocation = el.query ? JSON.parse(el.query).location : '';
              if (
                beforeLocation == search.location ||
                afterLocation == search.location ||
                search.location === ''
              ) {
                filterData.push({
                  name: el.name,
                  number: el.number,
                  beforeLocation,
                  afterLocation,
                  time: el.time,
                  type: el.type,
                });
              }
            });
            setSearchResult(filterData);
          }

          if (search.report == '廠商現貨報表') {
            let filterData = [];
            let allDataArr = [];
            const allData = await axios.post(
              `${Api.Tires.GetStatistics}`,
              { report: '廠商現貨報表' },
              AxiosConfig.General,
            );
            allData.data.forEach((v) => {
              let f = allDataArr.find(
                (f) => f.width === v.width && f.height === v.height && f.size === v.size,
              );
              if (!f) allDataArr.push({ width: v.width, height: v.height, size: v.size });
            });
            let allDataArrASC = orderBy(
              allDataArr,
              ['width', 'height', 'size'],
              ['asc', 'asc', 'asc'],
            );
            result.data.forEach((el) => {
              let resObj = filterData.find(
                (resObj) =>
                  resObj.width === el.width &&
                  resObj.height === el.height &&
                  resObj.size === el.size,
              );
              resObj
                ? resObj.count++
                : filterData.push({ width: el.width, height: el.height, size: el.size, count: 1 });
            });
            let resultData = allDataArrASC.map((v) => {
              let resObj = filterData.find(
                (resObj) =>
                  resObj.width === v.width && resObj.height === v.height && resObj.size === v.size,
              );
              if (resObj) {
                return { width: v.width, height: v.height, size: v.size, count: resObj.count };
              } else {
                return { width: v.width, height: v.height, size: v.size, count: 0 };
              }
            });

            setSearchResult(resultData);
          }
          setLoading(false);
          setShowResult(true);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [search, labels],
  );

  const getReportBlob = async () => {
    const data = [];
    const filename = search.report;
    let wb = await XlsxPopulate.fromBlankAsync();
    let tab = wb.sheet(0).name(filename);
    // 現貨報表
    if (filename === '現貨報表') {
      searchResult.forEach((v) => {
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
      tab.range('A1:M1').value([title]).style({ horizontalAlignment: 'center' });
      tab
        .range(`A2:M${data.length + 2}`)
        .value(data)
        .style({ horizontalAlignment: 'center' });
      tab.column('A').width(16);
      tab.column('E').width(16);
      const out = await wb.outputAsync();
      let file = new Blob([out], { type: 'octet/stream' });
      return {
        filename: `${filename} - ${moment().format('YYYY-MM-DD hh:mm:ss')}.xlsx`,
        blob: file,
      };
    }
    // 出貨報表
    if (filename === '出貨報表') {
      searchResult.forEach((v) => {
        data.push([
          v.name,
          moment(v.time).format('YYYY-MM-DD hh:mm:ss'),
          v.number,
          v.currentInfo.shipping_date,
          v.currentInfo.location,
        ]);
      });
      const title = ['編輯人員', '編輯時間', '輪胎編號', '出貨日期', '最後地點'];
      tab.range('A1:E1').value([title]).style({ horizontalAlignment: 'center' });
      tab
        .range(`A2:E${data.length + 2}`)
        .value(data)
        .style({ horizontalAlignment: 'center' });
      tab.column('B').width(20);
      tab.column('D').width(16);
      const out = await wb.outputAsync();
      let file = new Blob([out], { type: 'octet/stream' });
      return {
        filename: `${filename} - ${moment().format('YYYY-MM-DD hh:mm:ss')}.xlsx`,
        blob: file,
      };
    }
    // 調貨報表
    if (filename === '調貨報表') {
      searchResult.forEach((v) => {
        data.push([
          v.name,
          moment(v.time).format('YYYY-MM-DD hh:mm:ss'),
          v.number,
          v.beforeLocation,
          v.afterLocation,
        ]);
      });
      const title = ['編輯人員', '編輯時間', '輪胎編號', '調胎前', '調胎後'];
      tab.range('A1:E1').value([title]).style({ horizontalAlignment: 'center' });
      tab
        .range(`A2:E${data.length + 2}`)
        .value(data)
        .style({ horizontalAlignment: 'center' });
      tab.column('B').width(20);
      const out = await wb.outputAsync();
      let file = new Blob([out], { type: 'octet/stream' });
      return {
        filename: `${filename} - ${moment().format('YYYY-MM-DD hh:mm:ss')}.xlsx`,
        blob: file,
      };
    }
    // 廠商現貨報表
    if (filename === '廠商現貨報表') {
      searchResult.forEach((v) => {
        data.push([v.width, v.height, v.size, v.count]);
      });
      const title = ['胎寬', '胎高', '大小', '數量'];
      tab.range('A1:D1').value([title]).style({ horizontalAlignment: 'center' });
      tab
        .range(`A2:D${data.length + 2}`)
        .value(data)
        .style({ horizontalAlignment: 'center' });
      const out = await wb.outputAsync();
      let file = new Blob([out], { type: 'octet/stream' });
      return {
        filename: `${filename} - ${moment().format('YYYY-MM-DD hh:mm:ss')}.xlsx`,
        blob: file,
      };
    }
  };

  const handleDownload = async () => {
    const res = await getReportBlob();
    const link = document.createElement('a');
    link.download = res.filename;
    link.href = URL.createObjectURL(res.blob);
    link.click();
  };

  useEffect(() => {
    if (search.report === '現貨報表' || search.report === '廠商現貨報表') {
      setDateCheckDisabled(true);
    } else {
      setDateCheckDisabled(false);
    }
  }, [search]);

  return (
    <>
      <form onSubmit={startSearch}>
        <div className={classes.main}>
          <div className={classes.row}>
            <CheckboxLabels setLabelFunc={setLabels} dateCheckDisabled={dateCheckDisabled} />
          </div>
          {Object.values(labels).some((value) => value === true) && (
            <div className={classes.row}>
              {labels.report && (
                <ReportField
                  value={search.report}
                  onChange={(report) => updateSearchArgs({ report })}
                />
              )}
              {labels.location && (
                <LocationField
                  value={search.location}
                  onChange={(location) => updateSearchArgs({ location })}
                />
              )}
              {labels.start_date && (
                <DateField
                  value={search.start_date}
                  onChange={(start_date) => updateSearchArgs({ start_date })}
                  label="起始日期"
                />
              )}
              {labels.end_date && (
                <DateField
                  value={search.end_date}
                  onChange={(end_date) => updateSearchArgs({ end_date })}
                  label="結束日期"
                />
              )}
            </div>
          )}
        </div>
        <div className={classes.searchButton}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            startIcon={<Search />}
          >
            {'報表查詢'}
          </Button>
        </div>
      </form>
      {loading && (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      )}
      {console.log('result:', searchResult)}
      {!loading && !isEmpty(searchResult) && isArray(searchResult) && showResult ? (
        <div>
          <div className={classes.row}>
            <Button
              variant="contained"
              type="button"
              color="primary"
              size="large"
              startIcon={<CloudDownload />}
              onClick={handleDownload}
            >
              {'下載XLSX報表'}
            </Button>
            <br />
          </div>
          <StatisticsResultTable data={searchResult} searchType={search.report} />
        </div>
      ) : null}
    </>
  );
}
