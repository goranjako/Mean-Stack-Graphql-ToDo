"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _require = require('apollo-server'),
    AuthenticationError = _require.AuthenticationError;

var jwt = require('jsonwebtoken');

_dotenv["default"].config();

module.exports = function (req) {
  // context = { ...headers }
  var authHeader = req.req.headers.authorization;

  if (authHeader) {
    // convention for tokens: "Bearer ..."
    var token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        var user = jwt.verify(token, process.env.SECRET_TOKEN);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]'");
  } // error handling


  throw new Error('Authorization header must be provided');
};