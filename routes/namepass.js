const express = require('express');
const router = express.Router();
const { getData, getDataById, addData, updateData, deleteData } = require('../controller/namepass');

router.get('/',getData)
router.get('/:id',getDataById)
router.post('/add',addData)
router.put('/update/:id',updateData)
router.delete('/delete/:id',deleteData)

module.exports = router;