var express = require('express');
var router = express.Router();
var gateway = require('../controllers/gatewayApi')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/sendmail',gateway.sendmail)
router.get('/bukutamu',gateway.findByApps)

module.exports = router;
