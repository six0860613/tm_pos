const express = require('express');
const router = express.Router();
const { pool } = require('../dbConfig');
const { isEmpty } = require('lodash');

router.post('/db/createTire', (req, res) => {
  console.log('[Insert]', req.body);
  const {
    purchase_date,
    width,
    height,
    size,
    brand,
    price,
    year,
    firm,
    number,
    shipping_date,
    client,
    status,
    location,
    remarks,
    image,
  } = req.body;
  pool.query(
    'INSERT INTO inventory ' +
      '(purchase_date, width, height, size, ' +
      'brand, price, year, firm, number, ' +
      'shipping_date, client, status, location, remarks, image) ' +
      'VALUES ' +
      '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);',
    [
      purchase_date,
      width,
      height,
      size,
      brand,
      price,
      year,
      firm,
      number,
      isEmpty(shipping_date) ? null : shipping_date,
      client,
      status,
      location,
      remarks,
      image,
    ],
    (err) => {
      if (err) {
        throw err;
      } else {
        res.end();
      }
    },
  );
});

router.post('/db/editTire', (req, res) => {
  console.log('[Edit]', req.body);
  const {
    purchase_date,
    width,
    height,
    size,
    brand,
    price,
    year,
    firm,
    number,
    shipping_date,
    client,
    status,
    location,
    remarks,
    image,
  } = req.body;
  pool.query(
    'UPDATE inventory ' +
      'SET purchase_date = $1, ' +
      'width = $2, ' +
      'height = $3, ' +
      'size = $4, ' +
      'brand = $5, ' +
      'price = $6, ' +
      'year = $7, ' +
      'firm = $8, ' +
      'shipping_date = $9, ' +
      'client = $10, ' +
      'status = $11, ' +
      'location = $12, ' +
      'remarks = $13, ' +
      'image = $14 ' +
      'WHERE number = $15 ',
    [
      isEmpty(purchase_date) ? null : purchase_date,
      width,
      height,
      size,
      brand,
      price,
      year,
      firm,
      isEmpty(shipping_date) ? null : shipping_date,
      client,
      status,
      location,
      remarks,
      image,
      number,
    ],
    (err) => {
      if (err) {
        throw err;
      } else {
        res.end();
      }
    },
  );
});

router.post('/db/deleteTire', (req, res) => {
  console.log('[Delete]', req.body);
  const { number } = req.body;
  pool.query('DELETE from inventory ' + 'WHERE number = $1 ', [number], (err) => {
    if (err) {
      throw err;
    } else {
      res.end();
    }
  });
});
// TODO: Ugly code, fix it later
router.post('/db/searchTires', (req, res) => {
  const { limit, ...submit } = req.body;
  if (isEmpty(submit)) {
    res.end();
  } else {
    let searchQuery = 'SELECT * FROM inventory ';
    let firstCondition = true;

    if (!isEmpty(submit.purchase_date)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`purchase_date = '${submit.purchase_date}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.width)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`width = '${submit.width}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.height)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`height = '${submit.height}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.size)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`size = '${submit.size}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.brand)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`brand = '${submit.brand}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.price)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`price = '${submit.price}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.year)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`year = '${submit.year}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.firm)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`firm = '${submit.firm}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.number)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`number = '${submit.number}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.shipping_date)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`shipping_date = '${submit.shipping_date}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.client)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`client = '${submit.client}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.status)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`status = '${submit.status}' `);
      firstCondition = false;
    }
    if (!isEmpty(submit.location)) {
      searchQuery = searchQuery.concat(firstCondition ? 'WHERE ' : 'AND ');
      searchQuery = searchQuery.concat(`location = '${submit.location}' `);
      firstCondition = false;
    }
    if (limit && limit === true) {
      searchQuery = searchQuery.concat('LIMIT 100');
    }
    pool.query(searchQuery, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length > 0) {
        return res.send(results.rows);
      } else {
        return res.end();
      }
    });
  }
});

module.exports = router;
