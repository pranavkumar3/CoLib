const testget=(req,res)=>{
    res.status(200).json({message:"TEST3"})
}

const testpost=(req,res)=>{
    res.status(200).json({message:"TEST2 post"})
}

const testput=(req,res)=>{
    res.status(200).json({message:`TEST2 ${req.params.id}`})
}

const testdelete=(req,res)=>{
    res.status(200).json({message:`TEST2 ${req.params.id}`})
}
module.exports={testget,testpost,testput,testdelete}