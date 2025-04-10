const { addIncome, getIncomes, deleteIncome, updateIncome } = require("../controllers/income");
const { addExpense, getExpense, deleteExpense, updateExpense } = require("../controllers/expense");
const { signup, login } = require("../controllers/user");

const router = require("express").Router();

// Routes for user authentication
router.post('/login', login);
router.post('/signup', signup);

// Routes for income management
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);
router.put('/update-income/:id', updateIncome);

// Routes for expense management
router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpense);
router.delete('/delete-expense/:id', deleteExpense);
router.put("/update-expense/:id", updateExpense);


module.exports = router;
 