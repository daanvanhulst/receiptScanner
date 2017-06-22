'use strict';

const express = require('express');
const router = express.Router();

const moduleService = require('./module.service');

router.get('/module', (req, res) => {
  moduleService.getModules()
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      res.status(response.statusCode).send(response.error);
    });
});

module.exports = router;

