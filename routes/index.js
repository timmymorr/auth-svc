const express = require('express');

const router = express.Router();

router.use('/V1', require('./V1'));

module.exports = router;