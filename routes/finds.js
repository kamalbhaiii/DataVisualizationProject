const router = require('express').Router();
const Data = require('../models/data.model');

router.route('/').get((req,res)=>{
    Data.find().then(data=>res.json(data)).catch(err=>res.json(err));
})

module.exports = router;