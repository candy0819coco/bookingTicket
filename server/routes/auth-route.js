const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/token");
const cookieSession = require("cookie-session");



router.get("/google", passport.authenticate("google", {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'//輸入這個才拿的到email
    ]
})
);

router.get("/google/callback", passport.authenticate("google",

    {
        successRedirect: "/auth/success",
        failureRedirect: "/auth/failed"
    }
));


router.get("/success", function (req, res) {

    const payload = {
        mName: req.user.displayName,
        mMail: req.user.emails[0].value,
        googleId: req.user.id
    };
    const token = jwt.sign(payload, config.jwtKey, { expiresIn: '24h' });

    // localStorage.setItem("user",token);
    res.cookie("user", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });//存到cookies 
    // return res.send({ message: "登入成功", "token": token, payload });
    res.redirect(`http://localhost:3000/`);
    // res.redirect(`http://localhost:3000/signIn/${token}`);


    // res.json({
    //     success: 'successful',
    //     message: '登入成功',
    //     user: req.user
    // })
    // res.send("ok");
})

router.get("/failed", function (req, res) {
    res.status(401).json({
        success: false,
        message: "登入失敗"
    })

})
module.exports = router;