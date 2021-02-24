const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const DocusignStrategy = require("passport-docusign");
const flash = require("express-flash");

const DsJwtAuth = require("../lib/DSJwtAuth");
const DSAuthCodeGrant = require("../lib/DSAuthCodeGrant");
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

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

server.use(express.json());
server.use(cors(corsOptions));
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

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use((req, res, next) => {
  req.dsAuthCodeGrant = new DSAuthCodeGrant(req);
  req.dsAuthJwt = new DsJwtAuth(req);
  req.dsAuth = req.dsAuthCodeGrant;
  // if (req.session.authMethod === "jwt-auth") {
  req.dsAuth = req.dsAuthJwt;
  // }
  next();
});

server.get("/callDS", eg001.getController);
server.post("/callDS", eg001.createController);

module.exports = server;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const SCOPES = ["signature"];
const ROOM_SCOPES = [
  "signature",
  "dtr.rooms.read",
  "dtr.rooms.write",
  "dtr.documents.read",
  "dtr.documents.write",
  "dtr.profile.read",
  "dtr.profile.write",
  "dtr.company.read",
  "dtr.company.write",
  "room_forms",
];
const CLICK_SCOPES = ["signature", "click.manage", "click.send"];

let scope;
if (dsConfig.examplesApi.isRoomsApi) {
  scope = ROOM_SCOPES;
} else if (dsConfig.examplesApi.isClickApi) {
  scope = CLICK_SCOPES;
} else {
  scope = SCOPES;
}

let hostUrl = "http://localhost:3000/";

let docusignStrategy = new DocusignStrategy(
  {
    production: dsConfig.production,
    clientID: dsConfig.dsClientId,
    scope: scope.join(" "),
    clientSecret: dsConfig.dsClientSecret,
    callbackURL: hostUrl + "/ds/callback",
    state: true, // automatic CSRF protection.
    // See https://github.com/jaredhanson/passport-oauth2/blob/master/lib/state/session.js
  },
  function _processDsResult(accessToken, refreshToken, params, profile, done) {
    // The params arg will be passed additional parameters of the grant.
    // See https://github.com/jaredhanson/passport-oauth2/pull/84
    //
    // Here we're just assigning the tokens to the account object
    // We store the data in DSAuthCodeGrant.getDefaultAccountInfo
    let user = profile;
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.expiresIn = params.expires_in;
    user.tokenExpirationTimestamp = moment().add(user.expiresIn, "s"); // The dateTime when the access token will expire
    return done(null, user);
  }
);
passport.use(docusignStrategy);
