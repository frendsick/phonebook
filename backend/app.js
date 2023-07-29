const express = require("express");
const app = express();
const personsApiRouter = require("./controllers/personsApi");
const viewsRouter = require("./controllers/views");
const middleware = require("./utils/middleware");
app.use(express.json());
app.use(express.static("build"));
require("dotenv").config();

// Allow requests from other origins
const cors = require("cors");
app.use(cors());

// Configure request logging with `morgan` middleware
const morgan = require("morgan");
morgan.token("body", function (req) {
    return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

// Use ejs for rendering templated HTML files
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Router
app.use("/", viewsRouter);
app.use("/api/persons", personsApiRouter);

// Custom error handler middleware
app.use(middleware.errorHandler);

module.exports = app;
