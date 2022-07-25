const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');

function initialize(passport) {
  console.log('[Passport] Initialize.');
  const authenticateUser = (email, password, done) => {
    console.log('[Passport] Account:', email);
    console.log('[Passport] Password: ', password);
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
      if (err) {
        throw err;
      }
      if (results.rows.length > 0) {
        const user = results.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            console.log('[Passport] Match: ', user);
            return done(null, user);
          } else {
            console.log(`[Passport] Password for ${email} is incorrect.`);
            return done(null, false, { message: 'Password is incorrect' });
          }
        });
      } else {
        console.log(`[Passport] Account ${email} doesn't exist.`);
        return done(null, false, {
          message: "Account doesn't exist.",
        });
      }
    });
  };
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser),
  );
  // The result of the serializeUser method is attached to the session as req.session.passport.user = {}.
  passport.serializeUser((user, done) => done(null, user.id));
  // The fetched object is attached to the request object as req.user
  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
      if (err) {
        return done(err);
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
