const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async (req,res) =>{
    const {title,amount,category,description,date} = req.body

    const income = IncomeSchema({
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
        res.status(200).json({message: "Income Added"})
    }catch(error){
        res.status(500).json({message: "Server Error"})

    }

    console.log(income)
}

exports.getIncomes = async (req,res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt:-1})
        // console.log(incomes)
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message:"Server Error"})
        
    }

}

exports.deleteIncome = async (req,res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message : "Income Deleted"})
        })
        .catch((err)=>{
            res.status(500).json({message : "Server Error"})
        })

}

// controllers/income.js




exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        // Validate the input
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if the amount is a valid number
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        // Check if income exists before updating
        const existingIncome = await IncomeSchema.findById(id);
        if (!existingIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        // Perform the update
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedIncome);
    } catch (error) {
        console.error("Error updating income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
