var express = require('express');
var router = express.Router();
var locDAO = require('../models/locDAO');

router.get('/loc', function (req, res, next) {
    locDAO.getFarmLocation(function (status, result) {
      res.status(200).send(result.data);
    });
});


module.exports = router;