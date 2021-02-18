const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const DsJwtAuth = require("../lib/DSJwtAuth");
const eg001 = require("../eg001EmbeddedSigning");
const dsConfig = require("../config/index.js").config;

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/user-router");

const server = express();

let max_session_min = 180;

server.get("/", (req, res) => {
  res.json({
    message: [
      "Welcome to the API",
      "This API is used so I can practice integrating DocuSign Node SDK into an existing project.",
    ],
  });
});

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(
  session({
    secret: dsConfig.sessionSecret,
    name: "ds-launcher-session",
    cookie: { maxAge: max_session_min * 60000 },
    saveUninitialized: true,
    resave: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);

server.use("/auth", authRouter);
server.use("/api/users", usersRouter);

server.use((req, res, next) => {
  req.dsAuthJwt = new DsJwtAuth(req);
  if (req.session.authMethod === "jwt-auth") {
    req.dsAuth = req.dsAuthJwt;
  }
  next();
});

server.post("/callDS", eg001.createController);

module.exports = server;
