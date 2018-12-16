var mongoose = require("mongoose");

var carSchema = mongoose.Schema({
        firstName: {type:String, default:"Not available"},
        lastName:{type:String, default:"Not available"},
        emailId:{type:String, default:"Not available"},
        phoneNo:{type:String, default:"Not available"},
        catergory:{type:String,default:"Not available"},//car ,bus
        make:{type:String,default:"Not available"},
        model:{type:String,default:"Not available"},
        year:{type:String,default:"Not available"},
        trim:{type:String,default:"Not available"},
        pincode:{type:String,default:"Not available"},
        kilometersDriven:{type:String, default:"Not available"},
        vehicleRegNo:{type:String,default:"Not available"},
        price:{type:String,default:"Not available"},
        carImage1:{type:String, default:'/upload/no-image.png'},
        carImage2:{type:String, default:'/upload/no-image.png'},
        carImage3:{type:String, default:'/upload/no-image.png'},
        carImage4:{type:String, default:'/upload/no-image.png'},
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Car", carSchema);