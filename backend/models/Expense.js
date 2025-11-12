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

// Index on user field for faster queries - all expense queries filter by user
ExpenseSchema.index({ user: 1 });

// Compound index for common query pattern: user expenses sorted by creation date
ExpenseSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Expense', ExpenseSchema);