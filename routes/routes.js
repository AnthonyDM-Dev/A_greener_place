const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const historyControllers = require('../controllers/historyControllers');
const reportControllers = require('../controllers/reportControllers');

// Homepage routing
router.get('/homepage', homeControllers.getHomepage);
router.get('/', homeControllers.redirectToHomepage);
router.get('/home', homeControllers.redirectToHomepage);

// Earth-status routing
router.get('/earth-status', historyControllers.getHistory);

// Report routing
router.get('/report', reportControllers.getReportPage);
router.post('/report', reportControllers.postReport);

module.exports = router;