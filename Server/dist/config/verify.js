"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.items = exports.signIn = exports.signUp = void 0;

var yup = _interopRequireWildcard(require("yup"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * USER MODEL Validation Rules
 */
var fullName = yup.string().required('Username is required.').min(5, 'Username should have atleast 5 characters.').max(20, 'Username should have atmost 10 characters.').matches(/^\w+$/, 'Should be alphanumeric.');
var password = yup.string().required('password is required.').min(3, 'password should have atleast 5 characters.').max(20, 'Username should have atmost 10 characters.');
var email = yup.string().required('Email is required.').email('This is invalid email.');
var userId = yup.string().required('userId is required.');
var item = yup.string().required('item is required.'); // User Registeration Validation Schema

var signUp = yup.object().shape({
  email: email,
  fullName: fullName,
  password: password
});
exports.signUp = signUp;
var signIn = yup.object().shape({
  email: email,
  password: password
});
exports.signIn = signIn;
var items = yup.object().shape({
  userId: userId,
  item: item
});
exports.items = items;