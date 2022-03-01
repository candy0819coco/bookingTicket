const passport = require("passport");
const db = require("./db");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();


passport.use(new GoogleStrategy({
 
    clientID: "41001237235-8ank8uvs403so4vmrfm63agj29uhqk8e.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
            done(null, profile);       
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})