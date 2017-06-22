'use strict';

const express = require('express');
const router = express.Router();

const customerService = require('./customer.service');

router.get('/customer', (req, res) => {
  customerService.getCustomers()
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

router.get('/', (req, res) => {
  res.send({"ApiDoc":"Coming"});
});

module.exports = router;
