const express = require('express');
const router = express.Router();
const { getTestData } = require('../controller/testdata');

//  get test data
router.get('/', getTestData);


module.exports = router;