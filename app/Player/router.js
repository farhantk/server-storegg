var express = require('express');
var router = express.Router();
const {landingPage, detailPage, category, checkout, history, historyDetail, dashboard,profile, updateProfile} = require('./controller')
const {isAuthPlayer} = require('../../middleware/auth')
const multer = require('multer')
const os = require('os')
/* GET home page. */

router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isAuthPlayer, checkout);
router.get('/history', isAuthPlayer, history);
router.get('/history/:id/detail', isAuthPlayer, historyDetail);
router.get('/dashboard', isAuthPlayer, dashboard);
router.get('/profile', isAuthPlayer, profile);
router.put('/profile', isAuthPlayer, multer({dest:os.tmpdir()}).single('image'), updateProfile);

module.exports = router;
