const mongoose = require('mongoose');

const MonthSchema = new mongoose.Schema({
    Year: {
        type: Number,
        required: true
    },
    Month: {
        type: String,
        required: true
    },
    Expense: {
        type: Number,
        required: true
    },
    Description: {
        type: String
    },
    Category: {
        type: String
    }
});

module.exports = mongoose.model('Month', MonthSchema);
