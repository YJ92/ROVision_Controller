var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/popup_broadcasting',function(req,res, next){
  	res.sendfile("./public/popup_broadcasting.html")
});

router.get('/popup_VR',function(req,res, next){
  	res.sendfile("./public/popup_VR.html")
});

module.exports = router;
