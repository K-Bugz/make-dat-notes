// central hub
const express = require('express');
const router = express.Router();

router.use(require('./htmlRoutes'));
router.use(require('./apiRoutes.js'));

module.exports = router;