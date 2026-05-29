const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// Route สำหรับหน้าเว็บ
router.get('/login', webController.getLogin);
router.post('/login', webController.postLogin);
router.get('/dashboard', webController.getDashboard);

module.exports = router;