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

//queries
router.get("/manage-testimonial", function(req,res){
    res.render('../views/admin/testimonial')
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

//add make
router.post("/create-make", function(req,res){
    Category.find({text:req.body.new.category}, function(err,data){
        if(err){
            console.log(err);
        }else{
            Make.create({text:req.body.new.make}, function(err, make_data){
                if(err){
                    console.log(err);
                }else{
                    data[0].make.push(make_data);
                    data[0].save(function(err){
                        res.end();
                    })
                }
            })
        }
    })
});

//add model
router.post("/create-model", function(req,res){
    //console.log(req.body);
    Make.find({text:req.body.new.make}, function(err,data){
        if(err){
            console.log(err);
        } else {
            Model.create({text:req.body.new.model}, function(err, model_data){
                if(err){
                    console.log(err)
                } else {
                    data[0].model.push(model_data);
                    data[0].save(function(err){
                        res.end();
                    })
                }
            })
        }
    })
});

//add year
router.post("/create-year", function(req,res){
    //console.log(req.body);
    Model.find({text:req.body.new.model}, function(err,data){
        if(err){
            console.log(err);
        } else {
            Year.create({text:req.body.new.year}, function(err, year_data){
                if(err){
                    console.log(err)
                } else {
                    data[0].year.push(year_data);
                    data[0].save(function(err){
                        res.end();
                    })
                }
            })
        }
    })
});

//add trim
router.post("/create-trim", function(req,res){
    Year.find({text:req.body.new.year}, function(err,data){
        if(err){
            console.log(err);
        } else {
            Trim.create({text:req.body.new.trim}, function(err, trim_data){
                if(err){
                    console.log(err)
                } else {
                    data[0].trim.push(trim_data);
                    data[0].save(function(err){
                        res.end();
                    })
                }
            })
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

//retrive make
router.get("/retrieve_make", function(req,res){
    Category.find({"text":req.query.categoryName}, function(err,data){
        if(err){
            res.send(err)
        } else{
            Category.findById(data[0].id).populate("make").exec(function(err, foundMake){
                if(err){
                    console.log(err)
                }else{
                    res.send({foundMake});
                }
            });
        }
    })
});

//retrieve model
router.get("/retrieve_model", function(req,res){
    Make.find({"text":req.query.makeName}, function(err,data){
        if(err){
            res.send(err)
        } else{
            Make.findById(data[0].id).populate("model").exec(function(err, foundMade){
                if(err){
                    console.log(err)
                }else{
                    res.send({foundMade});
                }
            });
        }
    })
});

//retrive year
router.get("/retrieve_year", function(req,res){
    Model.find({"text":req.query.modelName}, function(err,data){
        if(err){
            res.send(err)
        } else{
            Model.findById(data[0].id).populate("year").exec(function(err, foundYear){
                if(err){
                    console.log(err)
                }else{
                    res.send({foundYear});
                }
            });
        }
    })
});

//retrive trim
router.get("/retrieve_trim", function(req,res){
    Year.find({"text":req.query.yearName}, function(err,data){
        if(err){
            res.send(err)
        } else{
            Year.findById(data[0].id).populate("trim").exec(function(err, foundTrim){
                if(err){
                    console.log(err)
                }else{
                    res.send({foundTrim});
                }
            });
        }
    })
});


module.exports = router;