import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditIncomeForm({ incomeId, closeForm }) {
    const { updateIncome, getIncomeById } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: new Date(),
        category: "",
        description: "",
    });

    // Fetch the income details when component mounts
    useEffect(() => {
        const fetchIncome = async () => {
            const income = await getIncomeById(incomeId);
            if (income) {
                setInputState({
                    title: income.title,
                    amount: income.amount,
                    date: new Date(income.date),
                    category: income.category,
                    description: income.description,
                });
            }
        };
        fetchIncome();
    }, [incomeId]);

    // Handle input changes
    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the ID is available
        const updatedData = {
            title: inputState.title,
            amount: inputState.amount,
            category: inputState.category,
            description: inputState.description,
            date: inputState.date,
        };

        // Use the correct function and pass the correct id
        const success = await updateIncome(incomeId, updatedData);

        if (success) {
            console.log("Income updated successfully!");
            closeForm(); // Close form after success
        } else {
            console.log("Error updating income");
        }
    };

    return (
        <EditIncomeFormStyled onSubmit={handleSubmit}>
            <h3>Edit Income</h3>
            <input type="text" value={inputState.title} onChange={handleInput("title")} required />
            <input type="number" value={inputState.amount} onChange={handleInput("amount")} required />
            <DatePicker selected={inputState.date} onChange={(date) => setInputState({ ...inputState, date })} required />
            <select value={inputState.category} onChange={handleInput("category")} required>
                <option value="" disabled>Select Category</option>
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="freelance">Freelance</option>
                <option value="Stocks">Stocks</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Bank">Bank</option>
                <option value="Youtube">Youtube</option>
                <option value="gift">Gift</option>
                <option value="other">Other</option>
            </select>
            <textarea value={inputState.description} onChange={handleInput("description")} />
            <div className="button-group">
                <button type="submit">Update Income</button>
                <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
            </div>
        </EditIncomeFormStyled>
    );
}

// Styled Components
const EditIncomeFormStyled = styled.form`
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    left: -300px;  /* Moves form to the left of the income item */
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

export default EditIncomeForm;
