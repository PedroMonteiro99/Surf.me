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

module.exports = router;