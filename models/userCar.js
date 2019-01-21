var mongoose = require("mongoose");

var usercarSchema = mongoose.Schema({
        name:{type:String,default:"Not available"},
        place:{type:String,default:"Not available"},
        email:{type:String,default:"Not available"},
        number:{type:String,default:"Not available"},
        catergory:{type:String,default:"Not available"},//car ,bus
        make:{type:String,default:"Not available"},
        model:{type:String,default:"Not available"},
        year:{type:String,default:"Not available"},
        trim:{type:String,default:"Not available"},
        kilometersDriven:{type:String, default:"Not available"},
        vehicleRegNo:{type:String,default:"Not available"},
        price:{type:String,default:"Not available"},
        other:{type:String,default:"Not available"},
        carImage1:{type:String},
        carImage2:{type:String},
        carImage3:{type:String},
        carImage4:{type:String},
        carImage5:{type:String},
        carImage6:{type:String},
        carImage7:{type:String},
        carImage8:{type:String},
        carImage9:{type:String},
        carImage10:{type:String},
        sold:{type: Boolean, default: false},
        ownerShip:{type:String},
        insurance:{type:String},
        insuranceDate:{type:String},
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("UserCar", usercarSchema);