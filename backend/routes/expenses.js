const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

// @route   GET api/expenses
// @desc    Get all user expenses, sorted by latest
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/expenses
// @desc    Add new expense
router.post('/', auth, async (req, res) => {
    const { category, amount, comments } = req.body;
    try {
        const newExpense = new Expense({
            user: req.user.id,
            category,
            amount,
            comments
        });
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/expenses/:id
// @desc    Update an expense
router.put('/:id', auth, async (req, res) => {
    const { category, amount, comments } = req.body;
    const expenseFields = { category, amount, comments };

    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        expense = await Expense.findByIdAndUpdate(req.params.id, { $set: expenseFields }, { new: true });
        res.json(expense);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/expenses/:id
// @desc    Delete an expense
router.delete('/:id', auth, async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ msg: 'Expense not found' });
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Expense removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;