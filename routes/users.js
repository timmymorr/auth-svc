const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)

  router.route('/login')
    .post(controller.login)
};