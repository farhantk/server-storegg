var express = require('express');
var router = express.Router();
const {index, actionCreate, view_update, actionUpdate, actionRemove} = require('./controller')
const {isLoginAdmin} = require('../../middleware/auth')

/* GET home page. */
router.use(isLoginAdmin)
router.get('/', index);
router.post('/', actionCreate);
router.delete('/:id', actionRemove);
router.get('/update/:id', view_update);
router.put('/update/:id', actionUpdate);

module.exports = router;
