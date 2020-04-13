var express = require('express');
var router = express.Router();
var farmDAO = require('../models/farmDAO');

router.get('/:id', function (req, res, next) {
  var id = req.params.id
  farmDAO.getCurrentData(id, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

module.exports = router;