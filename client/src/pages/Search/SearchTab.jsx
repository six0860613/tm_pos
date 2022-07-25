import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { isEmpty, isArray } from 'lodash';
import { Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Api, AxiosConfig } from 'GlobalDefine';
import CheckboxLabels from './CheckboxLabels';
import DateField from 'components/Dropdown/DateField';
import WidthField from 'components/Dropdown/WidthField';
import HeightField from 'components/Dropdown/HeightField';
import SizeField from 'components/Dropdown/SizeField';
import BrandField from 'components/Dropdown/BrandField';
import PriceField from 'components/Dropdown/PriceField';
import YearField from 'components/Dropdown/YearField';
import FirmField from 'components/Dropdown/FirmField';
import NumberField from 'components/Dropdown/NumberField';
import ClientField from 'components/Dropdown/ClientField';
import StatusField from 'components/Dropdown/StatusField';
import LocationField from 'components/Dropdown/LocationField';
import SearchResultTable from './SearchResultTable';
import styles from './searchTabStyle';

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
    purchase_date: '',
    width: '',
    height: '',
    size: '',
    brand: '',
    price: '',
    year: '',
    firm: '',
    number: '',
    shipping_date: '',
    client: '',
    status: '',
    location: '',
    remarks: '',
  });

  const [labels, setLabels] = useState({
    purchase_date: false,
    width: false,
    height: false,
    size: false,
    brand: false,
    price: false,
    year: false,
    firm: false,
    number: false,
    shipping_date: false,
    client: false,
    status: false,
    location: false,
    remarks: false,
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
        if (labels.purchase_date === true) {
          submit = { ...submit, purchase_date: search.purchase_date };
        }
        if (labels.width === true) {
          submit = { ...submit, width: search.width };
        }
        if (labels.height === true) {
          submit = { ...submit, height: search.height };
        }
        if (labels.size === true) {
          submit = { ...submit, size: search.size };
        }
        if (labels.brand === true) {
          submit = { ...submit, brand: search.brand };
        }
        if (labels.price === true) {
          submit = { ...submit, price: search.price };
        }
        if (labels.year === true) {
          submit = { ...submit, year: search.year };
        }
        if (labels.firm === true) {
          submit = { ...submit, firm: search.firm };
        }
        if (labels.number === true) {
          submit = { ...submit, number: search.number };
        }
        if (labels.shipping_date === true) {
          submit = { ...submit, shipping_date: search.shipping_date };
        }
        if (labels.client === true) {
          submit = { ...submit, client: search.client };
        }
        if (labels.status === true) {
          submit = { ...submit, status: search.status };
        }
        if (labels.location === true) {
          submit = { ...submit, location: search.location };
        }
        submit = { ...submit, limit: !showAllResult };
        const result = await axios.post(`${Api.Tires.SearchTires}`, submit, AxiosConfig.General);
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
              {' '}
              {labels.purchase_date && (
                <DateField
                  value={search.purchase_date}
                  onChange={(purchase_date) => updateSearchArgs({ purchase_date })}
                  label="出貨日期"
                />
              )}
              {labels.width && (
                <WidthField
                  value={search.width}
                  onChange={(width) => updateSearchArgs({ width })}
                />
              )}
              {labels.height && (
                <HeightField
                  value={search.height}
                  onChange={(height) => updateSearchArgs({ height })}
                />
              )}
              {labels.size && (
                <SizeField value={search.size} onChange={(size) => updateSearchArgs({ size })} />
              )}
              {labels.brand && (
                <BrandField
                  value={search.brand}
                  onChange={(brand) => updateSearchArgs({ brand })}
                />
              )}
              {labels.price && (
                <PriceField
                  value={search.price}
                  onChange={(price) => updateSearchArgs({ price })}
                />
              )}
              {labels.year && (
                <YearField value={search.year} onChange={(year) => updateSearchArgs({ year })} />
              )}
              {labels.firm && (
                <FirmField value={search.firm} onChange={(firm) => updateSearchArgs({ firm })} />
              )}
              {labels.number && (
                <NumberField
                  value={search.number}
                  onChange={(number) => updateSearchArgs({ number })}
                />
              )}
              {labels.location && (
                <LocationField
                  value={search.location}
                  onChange={(location) => updateSearchArgs({ location })}
                />
              )}
              {labels.shipping_date && (
                <DateField
                  value={search.shipping_date}
                  onChange={(shipping_date) => updateSearchArgs({ shipping_date })}
                  label="出貨日期"
                />
              )}
              {labels.client && (
                <ClientField
                  value={search.client}
                  onChange={(client) => updateSearchArgs({ client })}
                />
              )}
              {labels.status && (
                <StatusField
                  value={search.status}
                  onChange={(status) => updateSearchArgs({ status })}
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
            庫存查詢
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
          <SearchResultTable result={searchResult} refresh={startSearch} />
        </div>
      )}
    </>
  );
}
