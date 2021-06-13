"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var todo = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Todo {\n    id: ID!\n    userId: String!\n    item: String!\n    isCompleted: Boolean!\n  }\n  extend type Query {\n\n    todo(userId: String): [Todo!]!\n  }\n \n  type Message {\n    message: String!\n  }\n  input todoInput {\n    userId:String!\n    item: String!\n    isCompleted: Boolean!\n  }\n\n  extend type Mutation {\n    addTodo(input: todoInput!): Message!\n    deleteTodo(id: ID!): Message!\n    updateTodo(input: todoInput!, id: ID!): Message!\n  }\n"])));
var _default = todo;
exports["default"] = _default;