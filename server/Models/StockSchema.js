const { default: mongoose } = require("mongoose");

const StockSchema = new mongoose.Schema({
    NAME: String,
    LTP: String,
    fiftytwoWeekHigh : String,
    fiftytwoWeekLow : String,
    ThirtydayROI: String,
    ThreehundreddayROI : String
  });
  
 

  module.exports = mongoose.model('stock',StockSchema);