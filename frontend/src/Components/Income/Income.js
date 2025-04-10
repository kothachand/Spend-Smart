import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeForm from './IncomeForm';
import IncomeItem from '../IncomeItem/IncomeItem';
import EditIncomeForm from './EditIncomeForm';

function Income() {
    const { incomes, getIncomes, deleteIncome } = useGlobalContext();
    const [selectedIncomeId, setSelectedIncomeId] = useState(null);

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>₹{incomes.reduce((acc, curr) => acc + curr.amount, 0)}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <IncomeForm />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <div key={_id} className="income-item-container">
                                    {/* Show EditIncomeForm to the left when clicked */}
                                    {selectedIncomeId === _id && (
                                        <EditIncomeForm
                                            incomeId={_id}
                                            closeForm={() => setSelectedIncomeId(null)}
                                        />
                                    )}

                                    <div className="income-item">
                                        <IncomeItem
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount}
                                            date={date}
                                            type={type}
                                            category={category}
                                            indicatorColor="var(--color-blue)"
                                            deleteItem={deleteIncome}
                                        />
                                        <button className="edit-btn" onClick={() => setSelectedIncomeId(_id)}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F9FCFC;
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
            color: var(--color-blue);
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
        }
    }

    .income-item-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        position: relative;
    }

    .income-item {
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

export default Income;
