var mongoose = require("mongoose");

var trimSchema = mongoose.Schema({
    text: String,
});

module.exports = mongoose.model("Trim", trimSchema);