const Transactions = require('../models/Transactions')
//@desc All Transactions
//@route GET /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next)=>{
    try{
        const transactions = await Transactions.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
} 

//@desc Add Transactions
//@route POST /api/v1/transactions
//@access Public
exports.addTransaction = async(req, res, next)=>{
    try {
        const { text, amount } = req.body;

        //create in database
        const transaction = await Transactions.create(req.body)
        
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: message
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
} 

//@desc Delete Transactions
//@route DELETE /api/v1/transactions/:id
//@access Public
exports.deleteTransaction = async(req, res, next)=>{
    try {
        const transaction = await Transactions.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: `No transaction found with id ${req.params.id}`
            });
        }

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
} 