var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('compare',  { title: 'Phone Chart',layout:'master' });
});


module.exports = router;
