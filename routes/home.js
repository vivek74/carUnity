var express = require("express");
var router  = express.Router();
var Car = require('../models/car');
var Category = require("../models/car/category");
var Make = require("../models/car/make");
var Model = require("../models/car/model");
var Trim = require("../models/car/trim");
var Year = require("../models/car/year");
var Testimonial = require("../models/testimonial");

//home
router.get("/", function(req,res){
    Car.find({}).sort({'_id': -1}).limit(4).exec(function(err, data){
        if(err){
            res.send(err);
        } else {
            Testimonial.find({}, function(err,testimonialData){
                if(err){
                    console.log(err);
                } else {
                    res.render('../views/home/landing',{data:data, testimonialData:testimonialData});
                }
            })
            
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

//shop
router.get("/buy-cars", function(req,res){
    res.render("../views/home/shop");
});

//get all cars
router.get("/get-car-data", function(req,res){
    Car.find({}, function(err,data){
        if(err){
            console.log(err);
        } else {
            res.send({data});
        }
    });
});

//get modified data
router.get("/get-car-data-category/:id", function(req,res){
    Car.find({"catergory":req.params.id}, function(err,data){
        if(err){
            console.log(err);
        } else {
            console.log(data);
            res.send({data});
        }
    });
});

router.get("/get-car-data-make/:id", function(req,res){
    Car.find({"make":req.params.id}, function(err,data){
        if(err){
            console.log(err);
        } else {
            res.send({data});
        }
    });
});

router.get("/get-car-data-model/:id", function(req,res){
    Car.find({"model":req.params.id}, function(err,data){
        if(err){
            console.log(err);
        } else {
            res.send({data});
        }
    });
});

router.get("/get-car-data-year/:id", function(req,res){
    Car.find({"year":req.params.id}, function(err,data){
        if(err){
            console.log(err);
        } else {
            res.send({data});
        }
    });
});

router.get("/get-car-data-trim/:id", function(req,res){
    Car.find({"trim":req.params.id}, function(err,data){
        if(err){
            console.log(err);
        } else {
            res.send({data});
        }
    });
});

module.exports = router;
