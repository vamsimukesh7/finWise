const mongoose = require('mongoose');

const ExpenseCategorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ExpenseCategorie', ExpenseCategorySchema);
