var express = require('express');
var router = express.Router();
const {index, view_update, actionCreate, actionUpdate, actionRemove, actionUpdateStatus} = require('./controller')
const multer = require('multer')
const os = require('os')
const {isLoginAdmin} = require('../../middleware/auth')

/* GET home page. */
router.use(isLoginAdmin)
router.get('/', index);
router.post('/',multer({dest:os.tmpdir()}).single('image'), actionCreate);
router.delete('/:id', actionRemove);
router.get('/update/:id', view_update);
router.put('/update/:id',multer({dest:os.tmpdir()}).single('image'), actionUpdate);
router.put('/updateStatus/:id', actionUpdateStatus);

module.exports = router;
