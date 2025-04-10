const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req,res) =>{
    const {title,amount,category,description,date} = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All fields are required!"})
        }

        if(amount<=0 || !amount === 'number'){
            return res.status(400).json({message: "Amount must be a positive number"})
        }
        await income.save()
        res.status(200).json({message: "Expense Added"})
    }catch(error){
        res.status(500).json({message: "Server Error"})

    }

    console.log(income)
}

exports.getExpense = async (req,res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message:"Server Error"})
        
    }

}

exports.deleteExpense = async (req,res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message : "Expense Deleted"})
        })
        .catch((err)=>{
            res.status(500).json({message : "Server Error"})
        })

}
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    console.log("Received update request for ID:", id);
    console.log("Update data:", req.body);

    try {
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true } // Returns the updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found!" });
        }

        console.log("Updated expense:", updatedExpense);
        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


