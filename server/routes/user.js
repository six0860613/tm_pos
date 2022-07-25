const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/user/check', checkAuthenticated, (req, res) => {
  res.send({ isLogin: false, message: 'User not logged in.' });
});

router.get('/user/start', checkNotAuthenticated, (req, res) => {
  res.send({
    isLogin: true,
    account: req.user.email,
    message: `logged in as user ${req.user.email}.`,
  });
});

router.get('/user/logout', (req, res) => {
  req.logout();
  res.send({
    isLogin: false,
    message: `user logged out.`,
  });
});

router.post(
  '/user/check',
  passport.authenticate('local', {
    successRedirect: '/user/start',
    failureRedirect: '/user/check',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
  }),
);

// router.post('/user/check', (req, res) => {
//   res.send({
//     isLogin: true,
//     account: 'test@mail.com',
//     message: `logged in as user TEST.`,
//   });
// });

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/start');
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/check');
}

module.exports = router;
