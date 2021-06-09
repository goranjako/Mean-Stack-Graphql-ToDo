"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServer = require("apollo-server");

var _apolloServerExpress = require("apollo-server-express");

var _verify = require("../../config/verify");

var _auth = _interopRequireDefault(require("../../config/auth"));

var _default = {
  Query: {
    //getById
    todo: function () {
      var _todo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref) {
        var req, Todo, _todo2;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = _ref.req, Todo = _ref.Todo;
                _context.next = 3;
                return (0, _auth["default"])(req);

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return Todo.find({
                  userId: args.userId
                });

              case 6:
                _todo2 = _context.sent;
                return _context.abrupt("return", _todo2);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                throw new _apolloServerExpress.UserInputError("Todo not found");

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));

      function todo(_x, _x2, _x3) {
        return _todo.apply(this, arguments);
      }

      return todo;
    }()
  },
  Mutation: {
    // Insert
    addTodo: function () {
      var _addTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(paren, _ref2, _ref3) {
        var input, Todo, req, todo, savedtodo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref2.input;
                Todo = _ref3.Todo, req = _ref3.req;
                _context2.next = 4;
                return (0, _auth["default"])(req);

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return _verify.items.validate(input, {
                  abortEarly: false
                });

              case 7:
                todo = new Todo({
                  userId: input.userId,
                  item: input.item,
                  complete: input.complete
                });
                _context2.next = 10;
                return todo.save();

              case 10:
                savedtodo = _context2.sent;
                return _context2.abrupt("return", savedtodo);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](4);
                throw new _apolloServerExpress.ApolloError(_context2.t0.message);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 14]]);
      }));

      function addTodo(_x4, _x5, _x6) {
        return _addTodo.apply(this, arguments);
      }

      return addTodo;
    }(),
    //delete
    deleteTodo: function () {
      var _deleteTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref4, _ref5) {
        var id, req, Todo, todo;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref4.id;
                req = _ref5.req, Todo = _ref5.Todo;
                _context3.next = 4;
                return (0, _auth["default"])(req);

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return Todo.deleteOne({
                  _id: id
                });

              case 7:
                todo = _context3.sent;
                return _context3.abrupt("return", {
                  message: "Successful Delete Item"
                });

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](4);
                throw new _apolloServerExpress.UserInputError("Item not found");

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 11]]);
      }));

      function deleteTodo(_x7, _x8, _x9) {
        return _deleteTodo.apply(this, arguments);
      }

      return deleteTodo;
    }(),
    //update
    updateTodo: function () {
      var _updateTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref6, _ref7) {
        var id, updatedTodo, req, Todo, todo, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref6.id, updatedTodo = _ref6.updatedTodo;
                req = _ref7.req, Todo = _ref7.Todo;
                _context4.next = 4;
                return (0, _auth["default"])(req);

              case 4:
                _context4.prev = 4;
                _context4.next = 7;
                return Todo.findById({
                  _id: id
                }).exec();

              case 7:
                todo = _context4.sent;
                todo.set(updatedTodo);
                _context4.next = 11;
                return todo.save();

              case 11:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](4);
                throw new _apolloServerExpress.UserInputError("Item not found");

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 15]]);
      }));

      function updateTodo(_x10, _x11, _x12) {
        return _updateTodo.apply(this, arguments);
      }

      return updateTodo;
    }()
  }
};
exports["default"] = _default;