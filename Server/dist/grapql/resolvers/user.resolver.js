"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _auth = _interopRequireDefault(require("../../config/auth"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verify = require("../../config/verify.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  Query: {
    //getById
    userId: function () {
      var _userId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref) {
        var req, User, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = _ref.req, User = _ref.User;
                _context.next = 3;
                return (0, _auth["default"])(req);

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return User.findById(args.id);

              case 6:
                user = _context.sent;
                return _context.abrupt("return", user);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                throw new _apolloServerExpress.UserInputError("User not found");

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));

      function userId(_x, _x2, _x3) {
        return _userId.apply(this, arguments);
      }

      return userId;
    }(),
    //Login
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(paren, _ref2, _ref3) {
        var input, User, user, isEqual, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref2.input;
                User = _ref3.User;
                _context2.next = 4;
                return _verify.signIn.validate(input, {
                  abortEarly: false
                });

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return User.findOne({
                  email: input.email
                });

              case 7:
                user = _context2.sent;

                if (user) {
                  _context2.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("User  not found");

              case 10:
                _context2.next = 12;
                return _bcryptNodejs["default"].compareSync(input.password, user.password);

              case 12:
                isEqual = _context2.sent;

                if (isEqual) {
                  _context2.next = 15;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("Wrong credentials!");

              case 15:
                token = _jsonwebtoken["default"].sign({
                  user: user
                }, process.env.SECRET_TOKEN, {
                  expiresIn: 60 * 60
                });
                return _context2.abrupt("return", {
                  token: token
                });

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](4);
                throw _context2.t0;

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 19]]);
      }));

      function login(_x4, _x5, _x6) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  },
  Mutation: {
    //Register
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(paren, _ref4, _ref5) {
        var input, User, exsist, newUser, user, token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                input = _ref4.input;
                User = _ref5.User;
                _context3.next = 4;
                return _verify.signUp.validate(input, {
                  abortEarly: false
                });

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return User.findOne({
                  email: input.email
                });

              case 7:
                exsist = _context3.sent;

                if (!exsist) {
                  _context3.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError("User already Exists");

              case 10:
                newUser = new User({
                  fullName: input.fullName,
                  email: input.email,
                  password: input.password
                });
                _context3.next = 13;
                return newUser.save();

              case 13:
                user = _context3.sent;
                token = _jsonwebtoken["default"].sign({
                  user: user
                }, process.env.SECRET_TOKEN, {
                  expiresIn: 60 * 60
                });
                return _context3.abrupt("return", {
                  token: token
                });

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](4);
                throw _context3.t0;

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 18]]);
      }));

      function register(_x7, _x8, _x9) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }
};
exports["default"] = _default;