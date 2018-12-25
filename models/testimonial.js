var mongoose = require("mongoose");

var testimonialSchema = mongoose.Schema({
        firstName: {type:String, default:"Not available"},
        lastName:{type:String, default:"Not available"},
        emailId:{type:String, default:"Not available"},
        avatar:{type:String, default:'/upload/avatar.png'},
        text:{type:String, default:"Not available"}
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Testimonial", testimonialSchema);