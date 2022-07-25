const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const initializePassport = require('./passportConfig');
initializePassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// User API
const userRouter = require('./routes/user.js');
app.use(userRouter);

// Inventory API
const inventoryRouter = require('./routes/inventory.js');
app.use(inventoryRouter);

module.exports = app;
