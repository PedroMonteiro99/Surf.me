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

router.put('/update', function (req, res, next) {
  farmDAO.updateFarm(req.body, function (result) {
    res.send(result);
  });
});

router.get('/restrict/:id', function (req, res, next) {
  var id = req.params.id
  farmDAO.getRestrictions(id, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

router.post('/new', function (req, res, next) {
  farmDAO.postFarm(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

router.post('/newSensor', function (req, res, next) {
  farmDAO.postSensor(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

router.get('/culture/:id', function (req, res, next) {
  var id = req.params.id
  farmDAO.getidCulture(id, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

module.exports = router;