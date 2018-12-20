var mongoose = require("mongoose");

var categotySchema = mongoose.Schema({
    text: String,
    make: 
    [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Value"
        }
    ]
});

module.exports = mongoose.model("Category", categotySchema);