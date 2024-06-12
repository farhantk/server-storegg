var express = require('express');
var router = express.Router();
const {index, actionSignIn, actionSignOut} = require('./controller')


/* GET home page. */
router.get('/', index);
router.post('/', actionSignIn);
router.get('/signout', actionSignOut);

module.exports = router;
