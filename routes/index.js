var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


//login
router.get("/admin_login", function(req,res){
  res.render('../views/admin/admin-login');
});

//register
router.get("/register", function(req, res){
  res.render('../views/admin/admin-signup');
});

//post register
router.post("/admin_register", function(req,res){
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.send(err)
        }else{
        	res.redirect("/index/admin_login");
        }
    });
});

//post login
router.post("/admin_login", passport.authenticate("local", 
    {
        failureRedirect: "/index/admin_login"
    }), function(req, res){
    res.redirect('/');
});

//logout
router.get("/logout", function(req, res){
   req.logout();
   res.redirect('/');
}); 

//user-login
router.get("/user-login",middleware.isLoggedIn, function(req, res){
  res.send(`<a href="/logout">logout<a>`);
});

module.exports = router;
