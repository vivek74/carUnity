var express = require("express");
var router  = express.Router();
var Car = require('../models/car');
var User = require('../models/user');

var Category = require("../models/car/category");
var Make = require("../models/car/make");
var Model = require("../models/car/model");
var Trim = require("../models/car/trim");
var Year = require("../models/car/year");

var moment = require('moment-timezone');
var multer=require('multer');
var path= require('path');

var storage=multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
		cb(null,file.originalname);
	}
});
//init upload

var upload=multer({storage: storage,fileFilter: function(req, file,cb){
		checkFileType(file,cb);
	}
}).array('myImage',4);

//check file type
function checkFileType(file,cb){
	//allowed ext
	var filetypes = /jpeg|jpg|png|gif/;
	//check ext
	var extname = filetypes.test(path.extname
		(file.originalname).toLowerCase());
	//check mime
	var mimetype=filetypes.test(file.mimetype);
	if(mimetype && extname){
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}


router.get("/add_cars", function(req,res){
    res.render('../views/admin/addcars.ejs');
});

//add new car
router.post("/add_new_car", function(req,res){

    upload(req, res, (err) =>{
        if(err){
            console.log(err);
            req.flash('error', 'error went');
            res.redirect("back");
        } else{
            var newCar = new Car({
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                emailId:req.body.emailId,
                phoneNo:req.body.phoneNo,
                catergory:req.body.catergory,
                make:req.body.make,
                model:req.body.model,
                year:req.body.year,
                trim:req.body.trim,
                pincode:req.body.pincode,
                kilometersDriven:req.body.kilometersDriven,
                vehicleRegNo:req.body.vehicleRegNo,
                price:req.body.price
            });
            
            if(req.files[0] != undefined){
                newCar.carImage1 = "/uploads/"+req.files[0].filename;
            }
            if(req.files[1] != undefined){
                newCar.carImage2 = "/uploads/"+req.files[1].filename;
            }
            if(req.files[2] != undefined){
                newCar.carImage3 = "/uploads/"+req.files[2].filename;
            }
            if(req.files[3] != undefined){
                newCar.carImage4 = "/uploads/"+req.files[3].filename;
            }

            Car.create(newCar, function(err, data){
                if(err){
                    res.send(err);
                }else{
                    res.redirect('back');
                }
            });
        }
    })

});

//edit car details
router.post("/edit_car_details/:carId", function(req,res){
    upload(req, res, (err) =>{
        if(err){
            console.log(err);
            req.flash('error', 'error went');
            res.redirect("back");
        } else{
            var newData = {
                firstName: req.body.firstName,
                lastName:req.body.lastName,
                emailId:req.body.emailId,
                phoneNo:req.body.phoneNo,
                catergory:req.body.catergory,
                make:req.body.make,
                model:req.body.model,
                year:req.body.year,
                trim:req.body.trim,
                pincode:req.body.pincode,
                kilometersDriven:req.body.kilometersDriven,
                vehicleRegNo:req.body.vehicleRegNo,
                price:req.body.price
            };
                    
            if(req.files[0] != undefined){
                newData.carImage1 = "/uploads/"+req.files[0].filename;
            }
            if(req.files[1] != undefined){
                newData.carImage2 = "/uploads/"+req.files[1].filename;
            }
            if(req.files[2] != undefined){
                newData.carImage3 = "/uploads/"+req.files[2].filename;
            }
            if(req.files[3] != undefined){
                newData.carImage4 = "/uploads/"+req.files[3].filename;
            }
            Car.findByIdAndUpdate(req.params.carId, {$set: newData}, function(err, data){
            if(err){
                res.send(err);
            } else {
                    res.redirect('back');
                }
            });
        }
    });
});

//view all cars
router.get("/view_all_cars", function(req,res){
    Car.find({}, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.render('../views/admin/landing',{data:data});
        }
    })
});


//queries
router.get("/queries", function(req,res){
    res.render('../views/admin/queries')
});

//more details
router.get("/product_details/:id", function(req,res){
    Car.findById(req.params.id, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.render('../views/admin/product_detail',{data:data});
        }
    })
    
});

//manage category
router.get("/manage-category", function(req,res){
    res.render('../views/admin/category.ejs');
});
//add category
router.post("/create-category", function(req,res){
    Category.create({text:req.body.new}, function(err,data){
        if(err){
            console.log(err);
        }else{
            res.contentType('json');
            res.send({data});
        }
    })
});

//reterive category
router.get("/retrieve_category", function(req,res){
    Category.find({}, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.contentType('json');
            res.send({data});
        }
    })
    
});


module.exports = router;