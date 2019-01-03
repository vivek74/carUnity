var mongoose = require("mongoose");

var querieSchema = mongoose.Schema({
        name: {type:String, default:"Not available"},
		phone:{type:String, default:"Not available"},
		email:{type:String, default:"Not available"},
		address:{type:String, default:"Not available"},
		carName:{type:String, default:"Not available"},
		purpose:{type:String, default:"Not available"}
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Querie", querieSchema);