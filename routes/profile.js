const express = require('express');
const router = express.Router();
const upload = require('../middleware/imageUploder');
const { createProfile ,getAllProfile,deleteProfile ,updateProfile,getProfileById,getProfileForLogin,deleteProfileDataById } = require('../controller/profile');

router.get('/',getAllProfile)
router.get('/login',getProfileForLogin)
router.get('/:id',getProfileById)
router.patch('/:id/clean-field',deleteProfileDataById)
router.post('/create',upload.single('photo'),createProfile)
router.put('/update/:id',upload.single('photo'),updateProfile)
router.delete('/delete/:id',deleteProfile)

module.exports = router;