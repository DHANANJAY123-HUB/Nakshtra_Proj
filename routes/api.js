const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const apiModel = require('../models/apiModel');

router.post('/signup',
    body('mobile_no').isLength({
     min:10,
     max:10 	
    }).withMessage('mobile_no should be required..'),(req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            //errors: errors.array()
            msg:'parameter required mobile_no..'
        });
    }
	apiModel.registerUser(req.body).then((result)=>{
      
        if(result){
            res.json({
                result:'true',
                msg:'mobile_no registered successfully..',
                data: result
           })
        }else{
            res.json({
               result: 'true',
        	   msg: 'mobile_no already registered please enter new mobile_no..',
               data:result
           })
        }    
        //var data = JSON.stringify(result2)
        
           /*res.json({
               result:response,
        	   msg:msg,
               data:result
           }); */
    }).catch((err)=>{
		res.json({message:err.message})
		//console.log(err)
	})
});

router.post('/verify_otp',
    body('otp').isLength({
     min:1,
     max:4     
    }).withMessage('otp should be required..'),(req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
            //errors: errors.array()
            msg:'parameter required otp..'
        });
    }
    apiModel.verify_otp(req.body).then((result)=>{
      
        if(result.length==0){
            res.json({
                result:'false',
                msg:'invalid otp..'
           })
        }else{
            req.otp=result[0].otp
            if(result[0].otp==req.otp){
                res.json({
                    result: 'true',
                    msg: 'otp successfully verify..',
                })
            }else{

            }
        }    
    }).catch((err)=>{
        res.json({message:err.message})
        //console.log(err)
    })
});

module.exports = router;