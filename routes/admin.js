var express = require("express");
var router  = express.Router();
var Car = require('../models/car');
var User = require('../models/user');
var UserCar = require('../models/userCar');

var Category = require("../models/car/category");
var Make = require("../models/car/make");
var Model = require("../models/car/model");
var Trim = require("../models/car/trim");
var Year = require("../models/car/year");
var Testimonial = require("../models/testimonial");
var Querie =require("../models/querie");

var moment = require('moment-timezone');
var multer=require('multer');
var path= require('path');

var nodemailer      = require("nodemailer");

var middleware = require("../middleware");

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
}).array('myImage',10);

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

router.get("/add_cars",middleware.isLoggedIn, function(req,res){
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
                location1:req.body.location1,
                catergory:req.body.catergory,
                make:req.body.make,
                model:req.body.model,
                year:req.body.year,
                trim:req.body.trim,
                kilometersDriven:req.body.kilometersDriven,
                vehicleRegNo:req.body.vehicleRegNo,
                price:req.body.price,
                ownerShip:req.body.ownerShip,
                insurance:req.body.insurance,
                insuranceDate:req.body.insuranceDate
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
            if(req.files[4] != undefined){
                newCar.carImage5 = "/uploads/"+req.files[4].filename;
            }
            if(req.files[5] != undefined){
                newCar.carImage6 = "/uploads/"+req.files[5].filename;
            }
            if(req.files[6] != undefined){
                newCar.carImage7 = "/uploads/"+req.files[6].filename;
            }
            if(req.files[7] != undefined){
                newCar.carImage8 = "/uploads/"+req.files[7].filename;
            }
            if(req.files[8] != undefined){
                newCar.carImage9 = "/uploads/"+req.files[8].filename;
            }
            if(req.files[9] != undefined){
                newCar.carImage10 = "/uploads/"+req.files[9].filename;
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
router.post("/edit_car_details/:carId",middleware.isLoggedIn, function(req,res){
    upload(req, res, (err) =>{
        if(err){
            console.log(err);
            req.flash('error', 'error went');
            res.redirect("back");
        } else{
            var newData = {
                location1:req.body.location1,
                location2:req.body.location2,
                location3:req.body.location3,
                owner: req.body.owner,
                catergory:req.body.catergory,
                make:req.body.make,
                model:req.body.model,
                year:req.body.year,
                trim:req.body.trim,
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
            if(req.files[4] != undefined){
                newCar.carImage5 = "/uploads/"+req.files[4].filename;
            }
            if(req.files[5] != undefined){
                newCar.carImage6 = "/uploads/"+req.files[5].filename;
            }
            if(req.files[6] != undefined){
                newCar.carImage7 = "/uploads/"+req.files[6].filename;
            }
            if(req.files[7] != undefined){
                newCar.carImage8 = "/uploads/"+req.files[7].filename;
            }
            if(req.files[8] != undefined){
                newCar.carImage9 = "/uploads/"+req.files[8].filename;
            }
            if(req.files[9] != undefined){
                newCar.carImage10 = "/uploads/"+req.files[9].filename;
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
router.get("/view_all_cars", middleware.isLoggedIn,function(req,res){
    Car.find({}, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.render('../views/admin/landing',{data:data});
        }
    })
});

//delete car
router.get("/delete-car/:id", middleware.isLoggedIn, function(req,res){
    Car.findByIdAndRemove(req.params.id, function(err,data){
        if(err){
            console.log(err);
        } else {
            res.redirect("/admin/view_all_cars");
        }
    })
});


//queries
router.get("/queries",middleware.isLoggedIn, function(req,res){
    res.render('../views/admin/queries')
});

//get queries
router.get("/get-querries",middleware.isLoggedIn, function(req,res){
    Querie.find({}, function(err,data){
        if(err){
            console.log(err);
        }else{
            res.send({data});
        }
    });
});

//create new queries
router.post("/new-queries",middleware.isLoggedIn, function(req,res){
    var newQuerie = new Querie ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address:req.body.address,
        carName:req.body.carName,
        purpose:req.body.purpose
    });
    Querie.create(newQuerie, function(err, data){
        if(err){
            res.send(err);
        }else{
            var transport = require('nodemailer-smtp-transport');
            var smtpTransport = nodemailer.createTransport(transport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: "unitycars123456@gmail.com",
                    pass: "Unitycars@123456"
                }
            }));
            var mailOptions = {
                to: "unitycarsho@gmail.com",
                from: "unitycars123456@gmail.com",
                subject: "New notification",
                text: 'New query!'
            };
            smtpTransport.sendMail(mailOptions, function(err){
                if(err) console.log(err);
                else{
                    res.end();
                }
            }); 
        }
    });
});

//delete queries
router.get("/delete-querries/:id",middleware.isLoggedIn, function(req,res){
    Querie.findByIdAndRemove(req.params.id, function(err,data){
        if(err){
            console.log(err);
        }else{
            res.end();
        }
    });
});

//testimonial
router.get("/manage-testimonial",middleware.isLoggedIn, function(req,res){
    res.render('../views/admin/testimonial')
});

//create testimonial
router.post("/testimonial-create",middleware.isLoggedIn, function(req,res){
    var newTestimonial = new Testimonial({
        firstName: req.body.firstname,
        lastName:req.body.lastname,
        emailId:req.body.emailid,
        text:req.body.blog
    });
    Testimonial.create(newTestimonial, function(err, data){
        if(err){
            res.send(err);
        }else{
            res.end();
        }
    });
});

//show testimonial
router.get("/show-testimonial",middleware.isLoggedIn, function(req,res){
    Testimonial.find({}, function(err, data){
        if(err){
            res.send(err);
        }else{
            res.send({data});
        }
    });
});

//remove testimonial
router.get("/remove-testimonial/:id",middleware.isLoggedIn, function(req,res){
    Testimonial.findByIdAndRemove(req.params.id, function(err, data){
        if(err){
            res.send(err);
        }else{
            res.end();
        }
    });
})


//more details
router.get("/product_details/:id",middleware.isLoggedIn, function(req,res){
    Car.findById(req.params.id, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.render('../views/admin/product_detail',{data:data});
        }
    })
});



//manage category
router.get("/manage-category",middleware.isLoggedIn, function(req,res){
    res.render('../views/admin/category.ejs');
});
//add category
router.post("/create-category",middleware.isLoggedIn, function(req,res){
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
router.post("/create-make",middleware.isLoggedIn, function(req,res){
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
router.post("/create-model",middleware.isLoggedIn, function(req,res){
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
router.post("/create-year",middleware.isLoggedIn, function(req,res){
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
router.post("/create-trim",middleware.isLoggedIn, function(req,res){
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

//new car submition

//add new user car
router.post("/user_add_new_car", function(req,res){

    upload(req, res, (err) =>{
        if(err){
            console.log(err);
            req.flash('error', 'error went');
            res.redirect("back");
        } else{
            var newCar = new UserCar({
                name:req.body.name,
                email:req.body.email,
                number:req.body.number,
                place:req.body.place,
                catergory:req.body.catergory,
                make:req.body.make,
                model:req.body.model,
                year:req.body.year,
                trim:req.body.trim,
                kilometersDriven:req.body.kilometersDriven,
                vehicleRegNo:req.body.vehicleRegNo,
                price:req.body.price,
                other:req.body.other,
                ownerShip:req.body.ownerShip,
                insurance:req.body.insurance,
                insuranceDate:req.body.insuranceDate
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
            if(req.files[4] != undefined){
                newCar.carImage5 = "/uploads/"+req.files[4].filename;
            }
            if(req.files[5] != undefined){
                newCar.carImage6 = "/uploads/"+req.files[5].filename;
            }
            if(req.files[6] != undefined){
                newCar.carImage7 = "/uploads/"+req.files[6].filename;
            }
            if(req.files[7] != undefined){
                newCar.carImage8 = "/uploads/"+req.files[7].filename;
            }
            if(req.files[8] != undefined){
                newCar.carImage9 = "/uploads/"+req.files[8].filename;
            }
            if(req.files[9] != undefined){
                newCar.carImage10 = "/uploads/"+req.files[9].filename;
            }

            UserCar.create(newCar, function(err, data){
                if(err){
                    res.send(err);
                }else{
                    var transport = require('nodemailer-smtp-transport');
                    var smtpTransport = nodemailer.createTransport(transport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: "unitycars123456@gmail.com",
                            pass: "Unitycars@123456"
                        }
                    }));
                    var mailOptions = {
                        to: "unitycarsho@gmail.com",
                        from: "unitycars123456@gmail.com",
                        subject: "New notification",
                        text: 'New car added to account!'
                    };
                    smtpTransport.sendMail(mailOptions, function(err){
                        if(err) console.log(err);
                        else{
                            res.redirect('/thanku-for-submition');
                        }
                    });
                    
                }
            });
        }
    })

});

//car submition route
router.get("/car-submition", function(req,res){
    UserCar.find({}, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.render('../views/admin/car-submition.ejs',{data:data});
        }
    });
});

//get detailed car
router.get("/car-submition/:id", function(req,res){
    UserCar.findById(req.params.id, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.render('../views/admin/submition_detail.ejs',{data:data});
        }
    });
});

//delete
router.get("/delete-car-submition/:id", function(req,res){
    UserCar.findByIdAndRemove(req.params.id, function(err,data){
        if(err){
            res.send(err)
        } else{
            res.redirect('/admin/car-submition')
        }
    });
});

//change status
router.get("/change_sold_status", function(req,res){
    console.log(req.query);
    var newData = {};
    if(req.query.sold == "IN SALE"){
        newData.sold = false;
    }
    if(req.query.sold == "SOLD OUT"){
        newData.sold = true;
    }
    Car.findByIdAndUpdate(req.query.id, {$set: newData}, function(err, data){
        if(err){
            res.send(err);
        } else {
            res.end();
        }
    });
});
module.exports = router;