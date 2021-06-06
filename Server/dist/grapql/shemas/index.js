"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _shema = _interopRequireDefault(require("./shema"));

var _todo = _interopRequireDefault(require("./todo"));

var _templateObject;

var base = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Query {\n    _: String!\n  }\n\n  type Mutation {\n    _: String!\n  }\n"])));
var typeDefs = [base, _shema["default"], _todo["default"]];
var _default = typeDefs;
exports["default"] = _default;