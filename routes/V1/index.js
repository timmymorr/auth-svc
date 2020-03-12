const express = require('express');
const controller = require('./controllers/users');
const validateToken = require('../../utils').validateToken;

const router = express.Router();

router.route('/users')
  .post(controller.add)

router.route('/login')
  .post(controller.login)

module.exports = router;