var mongoose = require("mongoose");

var makeSchema = mongoose.Schema({
    text: String,
    model: 
    [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Model"
        }
    ]
},
{
    usePushEach: true 
});

module.exports = mongoose.model("Make", makeSchema);