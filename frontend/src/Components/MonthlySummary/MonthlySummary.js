import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';

function MonthlySummary() {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => 
    {
        getIncomes();
        getExpenses();
    }, 
    [getIncomes, getExpenses]);

    useEffect(() => {
        const groupedData = groupByMonth(incomes, expenses);
        setMonthlyData(groupedData);
       console.log("hi")
        console.log(monthlyData)
        
    }, [incomes, expenses]);

    
    const groupByMonth = (incomes, expenses) => {
        const data = {};

        
        [...incomes, ...expenses].forEach(item => {
            const month = new Date(item.date).toLocaleString('default', { month: 'long', year: 'numeric' });
           

            if (!data[month]) {
                data[month] = { income: 0, expense: 0 };
            }

            
            if (item.type === 'income') {
                data[month].income += item.amount;
            } else if (item.type === 'expense') {
                data[month].expense += item.amount;
            }
        });

        return Object.entries(data).map(([month, { income, expense }]) => ({
            month,
            income,
            expense,
        }));
    };

    return (
        <SummaryStyled>
            <InnerLayout>
                <h1>Monthly Summary</h1>
                <div className="summary-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Total Income</th>
                                <th>Total Expense</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map(({ month, income, expense }) => (
                                <tr key={month}>
                                    <td>{month}</td>
                                    <td>₹{income}</td>
                                    <td>₹{expense}</td>
                                    <td>₹{income - expense}</td>  {/* Balance calculated as income - expense */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </InnerLayout>
        </SummaryStyled>
    );
}

const SummaryStyled = styled.div`
    .summary-table {
        margin-top: 2rem;
        table {
            width: 100%;
            border-collapse: collapse;
            th, td {
                border: 1px solid #ddd;
                padding: 1rem;
                text-align: center;
            }
            th {
                background: #f4f4f4;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background: #f9f9f9;
            }
        }
    }
`;

export default MonthlySummary;
