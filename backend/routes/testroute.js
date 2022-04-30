const express=require('express')
const router=express.Router()

const {testget,testput,testpost,testdelete}=require('../controllers/testcontroller')

router.get('/',testget)

router.post('/',testpost)

router.put('/:id',testput)

router.delete('/:id',testdelete)

module.exports=router