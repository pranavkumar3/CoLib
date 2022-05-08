const asyncHandler = require('express-async-handler')
const User=require('../models/userModel')

const testget=asyncHandler(async (req,res)=>{
    const ggoals= await User.find()
    res.status(200).json(ggoals)
}
)

const testpost=asyncHandler( async (req,res)=>{
    if(!req.body){
        res.status(400)
        throw new Error('Please add text')
    }
    console.log(req.body)
    const goal=await User.create(req.body)
    res.status(200).json(req.body)
}
)

const testput=asyncHandler(async (req,res)=>{
    const goal =await User.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("User not found")
    }
    const updatedGoal=await User.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedGoal)
}
)

const testdelete=asyncHandler(async(req,res)=>{
    const goal =await User.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("User not found")
    }
    await goal.remove()
    res.status(200).json({id:req.params.id})
}
)
module.exports={testget,testpost,testput,testdelete}