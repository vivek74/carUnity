var express = require("express");
var router  = express.Router();
var Car = require('../models/car');

//home
router.get("/", function(req,res){
    Car.find({}, function(err,data){
        if(err){
            res.send(err);
        } else {
            res.render('../views/home/landing',{data:data});
        }
    })
});

//details of selected car
router.get("/view_details/:carId", function(req,res){
    Car.findById(req.params.carId, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.contentType('json');
            res.send({data});
        }
    })
});

//contact us
router.get("/contact-us", function(req,res){
    res.render("../views/home/get_in_touch.ejs");
})

module.exports = router;
