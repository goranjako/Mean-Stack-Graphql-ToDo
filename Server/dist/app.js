"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _apolloServerExpress = require("apollo-server-express");

var _users = _interopRequireDefault(require("./models/users"));

var _todo = _interopRequireDefault(require("./models/todo"));

var _morgan = _interopRequireDefault(require("morgan"));

var _shemas = _interopRequireDefault(require("./grapql/shemas"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _resolvers = _interopRequireDefault(require("./grapql/resolvers"));

_dotenv["default"].config();

var app = (0, _express["default"])(); //mongoose setup

var mongodbURI;

if (process.env.NODE_ENV === "test") {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
}

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("useCreateIndex", true);

_mongoose["default"].set("useNewUrlParser", true);

_mongoose["default"].set("useFindAndModify", false);

_mongoose["default"].set("useUnifiedTopology", true);

_mongoose["default"].connect(mongodbURI).then(function (db) {
  console.log("Connected to MongoDB");
});

app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _compression["default"])()); // enable cors

app.use((0, _cors["default"])(corsOption));
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["token"]
};
app.use((0, _morgan["default"])("dev")); // Construct a schema, using GraphQL schema language

var rootResolveFunction = function rootResolveFunction(parent, args, context, info) {//perform action before any other resolvers
};

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _shemas["default"],
  resolvers: _resolvers["default"],
  context: function context(req) {
    return {
      req: req,
      User: _users["default"],
      Todo: _todo["default"]
    };
  }
});
server.applyMiddleware({
  app: app
});
app.listen({
  port: 4000
}, function () {
  return console.log("\uD83D\uDE80 Server ready at http://localhost:4000".concat(server.graphqlPath));
});