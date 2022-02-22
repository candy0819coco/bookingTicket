const key = require("./keys");
const passport = require("passport");
const db = require("./db");
require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth20').Strategy;

// const googleClientID = process.env.GOOGLE_ClIENT_ID;
// const googleClientID = key.googleClientID;
// const googleClientPassword = key.googleClientPassword;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ClIENT_ID,
    clientSecret: process.env.GOOGLE_ClIENT_PASSWORD,
    callbackURL: "http://localhost:3001/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {

        if(profile){
            db.query("insert into test01 (mName,mMail,googleId) values(?,?,?)"
            ,[profile.displayName,profile.emails[0].value,profile.id]
            ,function(err,result)
            {
                if(err){console.log(err);}
                if(result){
                    console.log(result);
                    done(null,profile);
                }
            })
        }
        // db.query("select * from test01 where mMail = ?"
        //     , [profile.emails[0].value]
        //     , (err, result) => {
        //         if (err) {//若有錯誤，返回
        //             done(err, false);
        //             console.log(error);
                    
        //         }
        //         if (!err && result.length != 0) {//如果用戶存在則傳回result
        //             return done(null, result);
        //         }
        //         else {
        //             db.query("insert into test01 set mName= ?, mMail = ?, googleId = ?"
        //                 , [profile.displayName, profile.emails[0].value, profile.id]
        //                 , function (err, cb) {
        //                     if (err) {
        //                         return done(err, cb)
        //                     } else {
        //                         db.query("select * from test01 where mMail=?"
        //                             , [profile.emails[0]]
        //                             , (err, user) => {
        //                                 console.log("登入成功");
        //                                 return done(null, user);

        //                             })
        //                     }

        //                 })
        //         }
        //     })
        // console.log(accessToken);//拿到token
        // console.log(profile);
        // console.log(profile.displayName);//拿到姓名
        // console.log(profile.emails[0].value);//拿到email
        // console.log(profile.photos[0].value);//拿到photos
        // console.log(profile.id);//拿到id
        // console.log(email);
        // done(null,profile);
        //51:12
    }//拿到token後要做甚麼
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})