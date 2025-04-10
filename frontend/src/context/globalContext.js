import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    // Inside your global context
    const updateIncome = async (incomeId, updatedData) => {
        try {
            console.log("Updating Income with ID:", incomeId);
            console.log("Update Data:", updatedData);
    
            const response = await axios.put(`${BASE_URL}update-income/${incomeId}`, updatedData);
    
            if (response.status === 200) {
                console.log("Updated Income:", response.data);
                
                // Update incomes list
                setIncomes((prevIncomes) =>
                    prevIncomes.map((income) =>
                        income._id === incomeId ? response.data : income
                    )
                );
                return true;
            }
        } catch (error) {
            console.error("Error updating income:", error.response?.data || error);
            return false;
        }
    };
    
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        console.log("Expenses list after update:", response.data);
        setExpenses(response.data);
    };
    

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const getExpenseById = async (id) => {
        try {
            const res = await axios.get(`/api/expenses/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching expense:", error);
        }
    };
    
    const updateExpense = async (id, updatedExpense) => {
        try {
            console.log("Sending update request for ID:", id);
            console.log("Update data being sent:", updatedExpense);
    
            const response = await axios.put(`${BASE_URL}update-expense/${id}`, updatedExpense);
    
            console.log("Response received:", response.data);
    
            if (response.status === 200) {
                await getExpenses(); // Refresh expenses list
                return true;
            }
        } catch (error) {
            console.error("Error updating expense:", error.response?.data || error);
            return false;
        }
    };
    
    

    


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            updateIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            updateExpense,
            getExpenseById,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}