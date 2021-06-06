"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var todo = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Todo {\n    id: ID!\n    userId: String!\n    item: String!\n    complete: Boolean!\n  }\n  extend type Query {\n\n    todo(userId: String): [Todos!]!\n  }\n  type Todos {\n    userId: String!\n    item: String!\n    complete: Boolean!\n  }\n  type Message {\n    message: String!\n  }\n  input todoInput {\n    userId: ID!\n    item: String!\n    complete: Boolean!\n  }\n\n  extend type Mutation {\n    addTodo(input: todoInput!): Todo!\n    deleteTodo(id: ID!): Message!\n    updateTodo(updatedTodo: todoInput!, id: ID!): Todo!\n  }\n"])));
var _default = todo;
exports["default"] = _default;