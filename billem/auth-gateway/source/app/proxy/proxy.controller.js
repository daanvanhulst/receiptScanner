'use strict';

const express = require('express');
const router = express.Router();
const winston = require('winston');

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

router.all('/customer*',  (req, res, next) => {
  console.log('in customer');
  proxy.web(req, res, { target: 'http://customer:3200' });
});

router.all('/module*',  (req, res, next) => {
  console.log('in module');
  proxy.web(req, res, { target: 'http://modules:3300' });
});

module.exports = router;