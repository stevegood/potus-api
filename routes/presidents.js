var express = require('express');
var router = express.Router();
var data = require('../data/presidents.json');
var _ = require('lodash');

router.get('/', function(req, res, next){
  res.send(data);
});

router.get('/parties', function(req, res, next){
  console.log('parties');
  var counts = [],
      parties = _.countBy(data, 'party');
  for (var name in parties) {
    counts.push({
      name: name,
      count: parties[name]
    });
  }
  res.send(counts);
});

router.get('/name-like/:q', function(req, res, next){
  console.log('name-like');
  res.send(_.filter(data, function(president){
    return president.name.toLowerCase().indexOf(req.params.q.toLowerCase()) > -1;
  }));
});

router.get('/with-year/:q', function(req, res, next){
  console.log('with-year');
  res.send(_.filter(data, function(president){
    return _.includes(president.years, parseInt(req.params.q));
  }));
});


router.get('/:id', function(req, res, next){
  console.log('id');
  var president = _.findWhere(data, {'_id': parseInt(req.params.id)});
  res.send(president);
});

module.exports = router;
