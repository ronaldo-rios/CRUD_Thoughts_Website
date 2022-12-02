const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/ThoughtController');
//helpers:
const checkAuth = require('../helpers/auth.js').checkAuth


router.get('/dashboard', checkAuth, ThoughtController.dashboard);
router.get('/add', checkAuth, ThoughtController.createThought);
router.post('/add', checkAuth, ThoughtController.createThoughtPost);
router.get('/', ThoughtController.showThoughts);

module.exports = router;