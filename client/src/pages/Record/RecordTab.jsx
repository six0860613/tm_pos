import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { isEmpty, isArray } from 'lodash';
import { Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import CheckboxLabels from './CheckboxLabels';
import DateField from 'components/Dropdown/DateField';
import NumberField from 'components/Dropdown/NumberField';
import NameField from 'components/Dropdown/NameField';
import RecordResultTable from './RecordResultTable';
import styles from './recordTabStyle';

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
  const [search, setSearch] = useState({
    number: '',
    name: '',
    start_date: '',
    end_date: '',
  });

  const [labels, setLabels] = useState({
    number: false,
    name: false,
    start_date: false,
    end_date: false,
  });

  const [showAllResult, setShowAllResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateSearchArgs = useCallback(
    (state) => {
      setSearch({ ...search, ...state });
    },
    [search],
  );

  const [searchResult, setSearchResult] = useState([]);

  const startSearch = useCallback(
    async (e) => {
      setLoading(true);
      if (e && e.cancelable) {
        e.preventDefault();
      }
      try {
        let submit = {};
        if (labels.number === true) {
          submit = { ...submit, number: search.number };
        }
        if (labels.name === true) {
          submit = { ...submit, name: search.name };
        }
        if (labels.start_date === true) {
          submit = { ...submit, start_date: search.start_date };
        }
        if (labels.end_date === true) {
          submit = { ...submit, end_date: search.end_date };
        }
        submit = { ...submit, limit: !showAllResult };
        const result = await axios.post(`${Api.Tires.SearchRecords}`, submit, AxiosConfig.General);
        setSearchResult(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [search, labels, showAllResult],
  );

  useEffect(() => {
    startSearch();
  }, [showAllResult]);

  const handleResultCount = (e) => {
    setShowAllResult(e.target.checked);
  };

  return (
    <>
      <form onSubmit={startSearch}>
        <div className={classes.main}>
          <div className={classes.row}>
            <CheckboxLabels setLabelFunc={setLabels} />
          </div>
          {Object.values(labels).some((value) => value === true) && (
            <div className={classes.row}>
              {labels.number && (
                <NumberField
                  value={search.number}
                  onChange={(number) => updateSearchArgs({ number })}
                />
              )}
              {labels.name && (
                <NameField
                  value={search.name}
                  onChange={(name) => updateSearchArgs({ name })}
                  required={true}
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
            {'編輯紀錄查詢'}
          </Button>
        </div>
      </form>
      {loading && (
        <div className={classes.center}>
          <CircularProgress />
        </div>
      )}
      {!loading && !isEmpty(searchResult) && isArray(searchResult) && (
        <div>
          <div className={classes.row}>
            {'最多顯示100筆資料'}
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAllResult}
                  onChange={handleResultCount}
                  name="showAllValue"
                  color="primary"
                />
              }
              label="顯示所有資料"
            />
          </div>
          <RecordResultTable data={searchResult} refresh={startSearch} />
        </div>
      )}
    </>
  );
}
