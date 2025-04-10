import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExpenseForm({ expenseId, closeForm }) {
    const { updateExpense, getExpenseById } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: new Date(),
        category: "",
        description: "",
    });

    // Fetch the expense details when component mounts
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

    // Handle input changes
    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateExpense(expenseId, inputState);
        if (success) {
            closeForm(); // Close form only if update was successful
        }
    };
    

    return (
        <EditExpenseFormStyled onSubmit={handleSubmit}>
            <h3>Edit Expense</h3>
            <input type="text" value={inputState.title} onChange={handleInput("title")} required />
            <input type="number" value={inputState.amount} onChange={handleInput("amount")} required />
            <DatePicker selected={inputState.date} onChange={(date) => setInputState({ ...inputState, date })} required />
            <select value={inputState.category} onChange={handleInput("category")} required>
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
            <textarea value={inputState.description} onChange={handleInput("description")} />
            <div className="button-group">
                <button type="submit">Update Expense</button>
                <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
            </div>
        </EditExpenseFormStyled>
    );
}

// Styled Components
const EditExpenseFormStyled = styled.form`
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    left: -300px;  /* Moves form to the left of the expense item */
    top: 0;
    width: 250px;
    z-index: 10;

    input, select, textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    textarea {
        height: 60px;
    }

    .button-group {
        display: flex;
        gap: 10px;
    }

    button {
        padding: 8px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background: #007bff;
        color: white;
    }

    .cancel-btn {
        background: #ff4d4d;
    }
`;

export default EditExpenseForm;
