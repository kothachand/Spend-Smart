import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';
import EditExpenseForm from './EditExpensesForm';



function Expenses() {
    const { expenses, getExpenses, deleteExpense } = useGlobalContext();
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">
                    Total Expense: <span>₹{expenses.reduce((acc, curr) => acc + curr.amount, 0)}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return (
                                <div key={_id} className="expense-item-container">
                                    {/* Show EditExpenseForm to the left when clicked */}
                                    {selectedExpenseId === _id && (
                                        <EditExpenseForm
                                            expenseId={_id}
                                            closeForm={() => setSelectedExpenseId(null)}
                                        />
                                    )}

                                    <div className="expense-item">
                                        <IncomeItem
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount}
                                            date={date}
                                            type={type}
                                            category={category}
                                            indicatorColor="var(--color-green)"
                                            deleteItem={deleteExpense}
                                        />
                                        <button className="edit-btn" onClick={() => setSelectedExpenseId(_id)}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }

    .expense-content {
        display: flex;
        gap: 2rem;
        .expenses {
            flex: 1;
        }
    }

    .expense-item-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        position: relative;
    }

    .expense-item {
        background: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .edit-btn {
        background: #007bff;
        color: white;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        margin-top: 10px;
    }
`;

export default Expenses;
