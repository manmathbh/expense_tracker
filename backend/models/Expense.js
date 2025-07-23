const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    category: { 
        type: String, 
        required: true, 
        trim: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    comments: { 
        type: String, 
        trim: true 
    }
}, { 
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Expense', ExpenseSchema);