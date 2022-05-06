const asyncHandler = require('express-async-handler')
const Goal=require('../models/goalModel')

const testget=asyncHandler(async (req,res)=>{
    const ggoals= await Goal.find()
    res.status(200).json(ggoals)
}
)

const testpost=asyncHandler( async (req,res)=>{
    console.log("AAAAA")
    console.log(req.body)
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text')
    }
    const goal=await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
}
)

const testput=asyncHandler(async (req,res)=>{
    const goal =await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedGoal)
}
)

const testdelete=asyncHandler(async(req,res)=>{
    const goal =await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    await goal.remove()
    res.status(200).json({id:req.params.id})
}
)
module.exports={testget,testpost,testput,testdelete}