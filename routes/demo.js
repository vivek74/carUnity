var express = require("express");
var router  = express.Router();
var Car = require('../models/car');
var moment = require('moment-timezone');

// for (var i = 1; i <= 25; i++) {
//     var newCar = new Car({
//         updated: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
//         carName: "Used Mercedes-Benz E-Class [2015-2017]",
//         carPrice: "₹ 32L",
//         year: "Aug 2015",
//         kilometer: "7,826 km",
//         fuelType: "Diesel",
//         transmission: "Automatic",
//         carAvailable: "Topsia Road, Kolkata",
//         color:"Silver",
//         fuelEconomy:"Not Available",
//         numberOfOwner:"Not Available",
//         // registeredAt:"",
//         // insurance:req.body.insurance,
//         // lifeTimeTax:req.body.lifeTimeTax,
//         // lastUpdated:req.body.lastUpdated,

//         // //specification
//         // //dimension and weight
//         // length:req.body.length,
//         // width:req.body.width,
//         // height:req.body.height,
//         // wheelbase:req.body.wheelbase,

//         // //capacity
//         // doors:req.body.doors,
//         // seatingCapacity:req.body.seatingCapacity,
//         // numberOfSeatingRows:req.body.numberOfSeatingRows,
//         // bootspace:req.body.bootspace,
//         // fuelTankCapacity:req.body.fuelTankCapacity,

//         // //engine and transmission
//         // displacement:req.body.displacement,
//         // engineType:req.body.engineType,
//         // maxPower:req.body.maxPower,
//         // maxTorque:req.body.maxTorque,
//         // mileage:req.body.mileage,
//         // turbochargerAndSuperchatger:req.body.turbochargerAndSuperchatger,
//         // turbochargerType:req.body.turbochargerType,
//         // numberOfGears:req.body.numberOfGears,
//         // transmissionType:req.body.transmissionType,
//         // drivetrain:req.body.drivetrain,
//         // duelCluthc:req.body.duelCluthc,
//         // sportMode:req.body.sportMode,
//         // manualShiftingForAutomatic:req.body.manualShiftingForAutomatic,
//         // drivingModes:req.body.drivingModes,
//         // engineStartStopFunction:req.body.engineStartStopFunction,
//         // alternateFuel:req.body.alternateFuel,
//         // valveCylinder:req.body.valveCylinder,

//         // //suspensionBreakesSteeringAndTyres
//         // suspensionFront:req.body.suspensionFront,
//         // suspensionRear:req.body.suspensionRear,
//         // frontBrake:req.body.frontBrake,
//         // rearBrakeType:req.body.rearBrakeType,
//         // minimumTurningRadius:req.body.minimumTurningRadius,
//         // steeringType:req.body.steeringType,
//         // wheels:req.body.wheels,
//         // spareWheel:req.body.spareWheel,
//         // frontWheel:req.body.frontWheel,
//         // rearTyres:req.body.rearTyres,

//         //fetures
//         safety:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         breakingAndTraction:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         locksAndSecurity:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         comfortAndConvenience:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         seatsAndUpholstery:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         storage:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         doorsWindowsMirrorsAndWipers:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         exterior:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         lighting:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         instrumentation:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ],
//         entertainmentInformationAndCommunication:[
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//             {
//                 text:"safety"+i
//             },
//         ]
//         });
//     Car.insertMany(newCar);
//  }


//edit car details
// router.get("/edit_car_details/:carId", function(req,res){
//     var newData = {
//         updated: moment.tz('Asia/Calcutta').format("YYYY-MM-DDTHH:MM:ss"),
//         carName: "Maruti lal",
//         carPrice: "₹ 34L",
//         year: "Aug 2015",
//         kilometer: "7,826 km",
//         fuelType: "Diesel",
//         transmission: "Automatic",
//         carAvailable: "Topsia Road, Kolkata",
//         color:"Silver"
//     };
// 	Car.findByIdAndUpdate(req.params.carId, {$set: newData}, function(err, data){
// 	if(err){
// 		res.send(err);
// 	} else {
// 		    res.contentType('json');
//             res.send({data});
// 		}
// 	});
// });

module.exports = router;