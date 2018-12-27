var mongoose = require("mongoose");

var querieSchema = mongoose.Schema({
        question: {type:String, default:"Not available"},
        answer:{type:String, default:"Not available"}
		},
	{
		usePushEach: true
});

module.exports = mongoose.model("Querie", querieSchema);