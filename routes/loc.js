var express = require('express');
var router = express.Router();
var locDAO = require('../models/locDAO');

router.get('/loc', function (req, res, next) {
    locDAO.getFarmLocation(function (status, result) {
      res.send(result);
    });
});


module.exports = router;