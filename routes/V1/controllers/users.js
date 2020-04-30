/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, (error) => {
      let result;
      let status = 201;
      if (!error) {
        const {
          firstName, lastName, email, password,
        } = req.body;
        const newUser = new User({
          firstName, lastName, email, password,
        });
        newUser.save((err, user) => {
          if (!err) {
            result = {
              id: user._id, email,
            };
          } else {
            status = 500;
            result = {
              message: 'Internal server error',
              code: status,
            };
          }
          res.status(status).send(result);
        });
      } else {
        status = 500;
        result = {
          message: 'Internal server error',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    mongoose.connect(connUri, (error) => {
      let result;
      let status = 200;
      if (!error) {
        User.findOne({ email }, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below
            bcrypt.compare(password, user.password).then((match) => {
              if (match) {
                // Create a token
                const payload = { user: user.email };
                const options = { expiresIn: '2d', issuer: 'https://timmymorr.io' };
                const secret = process.env.JWT_SECRET;
                result = {
                  id: user._id,
                  token: jwt.sign(payload, secret, options),
                };
              } else {
                status = 401;
                result = {
                  message: 'Authorization failure',
                  code: status,
                };
              }
              res.status(status).send(result);
            }).catch(() => {
              status = 500;
              result = {
                message: 'Internal server error',
                code: status,
              };
              res.status(status).send(result);
            });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Internal server error',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  getUser: (req, res) => {
    const { id } = req.params;
    mongoose.connect(connUri, (error) => {
      let result;
      let status = 200;
      if (!error) {
        User.findById(id, (err, user) => {
          if (!err && user) {
            result = user;
            res.status(status).send(result);
          } else {
            status = 404;
            result = {
              message: 'Unable to find user',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Internal server error',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
  getAll: (req, res) => {
    mongoose.connect(connUri, (error) => {
      let result;
      let status = 200;
      if (!error) {
        User.find({}, (err, users) => {
          if (!err && users) {
            res.status(status).send(users);
          } else {
            status = 500;
            result = {
              message: 'Internal server error',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      }
    });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    mongoose.connect(connUri, (error) => {
      let result;
      let status = 200;
      if (!error) {
        User.findByIdAndDelete(id, (err, user) => {
          if (!err && user) {
            result = { id: user._id };
            res.status(status).send(result);
          } else {
            status = 404;
            result = {
              message: 'Unable to find user',
              code: status,
            };
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result = {
          message: 'Internal server error',
          code: status,
        };
        res.status(status).send(result);
      }
    });
  },
};
