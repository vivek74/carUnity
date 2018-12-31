var mongoose = require("mongoose");

var carSchema = mongoose.Schema({
        owner: {type:String, default:"Not available"},
        location1: {type:String, default:"Not available"},
        location2: {type:String, default:"Not available"},
        location3: {type:String, default:"Not available"},
        catergory:{type:String,default:"Not available"},//car ,bus
        make:{type:String,default:"Not available"},
        model:{type:String,default:"Not available"},
        year:{type:String,default:"Not available"},
        trim:{type:String,default:"Not available"},
        kilometersDriven:{type:String, default:"Not available"},
        vehicleRegNo:{type:String,default:"Not available"},
        price:{type:String,default:"Not available"},
        carImage1:{type:String, default:'/upload/no-image.png'},
        carImage2:{type:String, default:'/upload/no-image.png'},
        carImage3:{type:String, default:'/upload/no-image.png'},
        carImage4:{type:String, default:'/upload/no-image.png'},
        carImage5:{type:String, default:'/upload/no-image.png'},
        carImage6:{type:String, default:'/upload/no-image.png'},
        carImage7:{type:String, default:'/upload/no-image.png'},
        carImage8:{type:String, default:'/upload/no-image.png'},
        carImage9:{type:String, default:'/upload/no-image.png'},
        carImage10:{type:String, default:'/upload/no-image.png'},
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Car", carSchema);