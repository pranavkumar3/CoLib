const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser')

const {testget,testput,testpost,testdelete}=require('../controllers/testcontroller')

router.use(bodyParser.json())

router.get('/',testget)

router.post('/',testpost)

router.put('/:id',testput)

router.delete('/:id',testdelete)

module.exports=router