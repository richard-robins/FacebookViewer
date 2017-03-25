const express = require('express');
const session = require('express-session');
const passport = require('passport');
const fbStrategy = require('passport-facebook').Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(session ({
    secret: 'some-random-string',
    resave: true,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new fbStrategy({
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook/', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  {
    successRedirect: '/me',
    failureRedirect: '/login',
  }));
  app.get('/me', (request, response) => {
    response.send(request.user);
  });

  app.listen(port, () => console.log(`Malware Server running on port ${port}`));
