const mongoose = require('mongoose');

const YearSchema = new mongoose.Schema({
    Year: {
        type: Number,
        required: true
    },
    Link: {
        type: String
    }
});

module.exports = mongoose.model('Year', YearSchema);
