var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 var x=  function randomWholeNum() {
  return Math.random();
}

  res.render('random', x);
});

module.exports = router;
