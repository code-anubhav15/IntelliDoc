import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';

// Function to configure OAuth authentication
const configureOAuth = (googleClientId, googleClientSecret, callbackURL) => {
  // Create an instance of Express
  const app = express();

  // Configure session middleware
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

  // Initialize Passport and restore authentication state from session
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport to use Google OAuth 2.0
  passport.use(new GoogleStrategy({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      // This function will be called when a user is authenticated
      // You can save the user to the database or perform other operations here
      return done(null, profile);
    }
  ));

  // Serialize user into the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Route for initiating OAuth authentication with Google
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  // Route for handling the callback from Google
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect to the home page or wherever you want
      res.redirect('/');
    }
  );

  // Route to check if the user is authenticated
  app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      res.send('Authenticated as: ' + JSON.stringify(req.user));
    } else {
      res.send('Not authenticated');
    }
  });


  return app;
};

export default configureOAuth;
