var mongoose = require("mongoose");

var modelSchema = mongoose.Schema({
    text: String,
    year: 
    [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Value"
        }
    ]
});

module.exports = mongoose.model("Model", modelSchema);