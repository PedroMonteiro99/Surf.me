var express = require('express');
var router = express.Router();
var authDAO = require('../models/authDAO');

router.post('/login', function (req, res, next) {
  authDAO.login(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

router.post('/register', function (req, res, next) {
  authDAO.register(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

router.get('/culture', function (req, res, next) {
  authDAO.getCultures(function (result) {
      res.send(result);
  });
});

router.get('/last', function (req, res, next) {
  authDAO.getLast(function (result) {
    res.send(result);
  });
});

module.exports = router;