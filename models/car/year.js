var mongoose = require("mongoose");

var yearSchema = mongoose.Schema({
    text: String,
    trim: 
    [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Trim"
        }
    ]
},
{
    usePushEach: true 
});

module.exports = mongoose.model("Year", yearSchema);