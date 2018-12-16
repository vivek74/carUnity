var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


//login
router.get("/admin_login", function(req,res){
  res.render("login");
});

//register
router.get("/register", function(req, res){
  res.render("signup");
});

//post register
router.post("/admin_register", function(req,res){
  var newUser = new User({
    username: req.body.username,
    phone: req.body.username,
    password: req.body.password,
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.send(err)
        }else{
        	res.redirect("/user-login");
        }
    });
});

//post login
router.post("/admin_login", passport.authenticate("local", 
    {
        failureRedirect: "/"
    }), function(req, res){
    res.send(user);
});

//logout
router.get("/logout", function(req, res){
   req.logout();
   res.send("sucessfully loged out")
}); 

//user-login
router.get("/user-login",middleware.isLoggedIn, function(req, res){
  res.send(`<a href="/logout">logout<a>`);
});

module.exports = router;
