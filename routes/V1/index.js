const tokenValidator = require('@timmymorr/token-validator');
const express = require('express');
const controller = require('./controllers/users');

const router = express.Router();

router.route('/users')
  .post(controller.add)
  .get(tokenValidator.validateToken, controller.getAll);

router.route('/user')
  .post(controller.login);

router.route('/user/:id')
  .get(tokenValidator.validateToken, controller.getUser)
  .delete(tokenValidator.validateToken, controller.deleteUser);

module.exports = router;
