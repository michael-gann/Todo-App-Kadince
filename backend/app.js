const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const csurf = require("csurf");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");

const routes = require("./routes");
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.static("/frontend/public"));
app.use(favicon(path.join(__dirname, "..", "/frontend/public", "favicon.ico")));

if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

module.exports = app;
