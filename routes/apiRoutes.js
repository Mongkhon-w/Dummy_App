const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Route สำหรับยิง API เพื่อสร้างข้อมูล
router.post('/data', apiController.createData);

module.exports = router;