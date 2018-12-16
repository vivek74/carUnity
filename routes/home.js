var express = require("express");
var router  = express.Router();
var Car = require('../models/car');

//home
router.get("/", function(req,res){
    Car.find({}, function(err,data){
        if(err){
            res.send(err);
        } else {
            res.render('../views/home/landing');
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

module.exports = router;
