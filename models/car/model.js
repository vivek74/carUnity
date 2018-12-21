var mongoose = require("mongoose");

var modelSchema = mongoose.Schema({
    text: String,
    year: 
    [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Year"
        }
    ]
},
{
    usePushEach: true 
});

module.exports = mongoose.model("Model", modelSchema);