import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';

function EditExpense({ expenseId, closeForm }) {
    const { updateExpense, getExpenseById } = useGlobalContext();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    useEffect(() => {
        const fetchExpense = async () => {
            const expense = await getExpenseById(expenseId);
            if (expense) {
                setInputState({
                    title: expense.title,
                    amount: expense.amount,
                    date: new Date(expense.date),
                    category: expense.category,
                    description: expense.description,
                });
            }
        };
        fetchExpense();
    }, [expenseId]);

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateExpense(expenseId, inputState);
        if (success) {
            closeForm();
        }
    };

    return (
        <EditExpenseStyled onSubmit={handleSubmit}>
            <h3>Edit Expense</h3>
            <input type="text" value={inputState.title} onChange={handleInput('title')} required />
            <input type="number" value={inputState.amount} onChange={handleInput('amount')} required />
            <DatePicker selected={inputState.date} onChange={(date) => setInputState({ ...inputState, date })} required />
            <select value={inputState.category} onChange={handleInput('category')} required>
                <option value="" disabled>Select Category</option>
                <option value="education">Education</option>
                <option value="groceries">Groceries</option>
                <option value="health">Health</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="takeaways">Takeaways</option>
                <option value="clothing">Clothing</option>
                <option value="travelling">Travelling</option>
                <option value="other">Other</option>
            </select>
            <textarea value={inputState.description} onChange={handleInput('description')} />
            <Button name="Update Expense" />
            <button type="button" onClick={closeForm}>Cancel</button>
        </EditExpenseStyled>
    );
}

const EditExpenseStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export default EditExpense;
