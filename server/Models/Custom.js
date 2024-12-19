const mongoose = require('mongoose');

const CustomSchema = new mongoose.Schema({
    Necessities: {
        type: Number,
        required: true
    },
    Savings: {
        type: Number,
        required: true
    },
    Entertainment: {
        type: Number,
        required: true
    },
    SelfImprovement: {
        type: Number,
        required: true
    },
    Miscellaneous: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Custom', CustomSchema);
