var express = require('express');
var router = express.Router();
var userDAO = require('../models/userDAO');

router.post('/id', function (req, res, next) {
  userDAO.getIdUser(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

module.exports = router;
