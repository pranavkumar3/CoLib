const express = require('express')
const router = express.Router()


router.get('/',(req,res) => {
    res.status(200).json({message: 'get goals'})
})

router.post('/',(req,res) => {
    res.status(200).json({message: 'send goals'})
})

router.put('/:id',(req,res) => {//parameters put in 
    res.status(200).json({message: `update goal with ${req.params.id}`})
})

router.delete('/:id',(req,res) => {//parameters put in 
    res.status(200).json({message: `delete goal with ${req.params.id}`})
})


module.exports=router