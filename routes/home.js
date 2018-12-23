var express = require("express");
var router  = express.Router();
var Car = require('../models/car');

//home
router.get("/", function(req,res){
    Car.find({}).sort({'_id': -1}).limit(4).exec(function(err, data){
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
            let make_detail = data.make;
            Car.find({"make":make_detail}).limit(4).exec(function(err, make_data){
                if(err){
                    console.log(err);
                } else {
                    res.render('../views/home/product_info',{data:data, make_data:make_data});
                }
            })
        }
    });
});

//thanku page
router.get("/contact-seller/:id", function(req,res){
    Car.findById(req.params.id, function(err,data){
        if(err){
            console.log(err)
        }else{
           res.render("../views/home/thanku_page",{data:data}); 
        }
    });
});

//sell car
router.get("/sell-cars", function(req,res){
    res.render("../views/home/sell_cars");
});

//contact us
router.get("/contact-us", function(req,res){
    res.render("../views/home/get_in_touch");
});

module.exports = router;
