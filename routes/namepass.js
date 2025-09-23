const express = require('express');
const router = express.Router();
const { getData, getDataByUser, addData, updateData, deleteData } = require('../controller/namepass');

router.get('/',getData)
router.get('/getuser',getDataByUser)
router.post('/add',addData)
router.put('/update/:id',updateData)
router.delete('/delete/:id',deleteData)

module.exports = router;