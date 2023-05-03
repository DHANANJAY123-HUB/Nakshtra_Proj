const db = require('./connection');

function apiModel() { 

	this.registerUser=(userDetails)=>{
		return new Promise((resolve,reject)=>{ 
			
			db.collection('user').find({'mobile_no': userDetails.mobile_no}).toArray((err,result)=>{
	 			//err ? reject(err) : resolve(result);
				var OTP = Math.floor(1000 + Math.random() * 9000);
                    
                if(result.length==0){
                    userDetails.otp=OTP.toString()
					userDetails.role="user"
					userDetails.current_date= new Date()
					
					db.collection('user').insertOne(userDetails,(err1,result1)=>{
						//err1 ? reject(err1) : resolve(result1);
						if(err1){
							reject(err1)
						}else{
							db.collection('user').find({'mobile_no': userDetails.mobile_no}).toArray((err,result)=>{
				                err ? reject(err) : resolve(result);	
					        })
						}
					})
				}else{   
				   db.collection('user').find({'mobile_no': userDetails.mobile_no}).toArray((err,result)=>{
				        err ? reject(err) : resolve(result);	
					})
					
				}
				//resolve(result)
			})
		})	
	}

	this.verify_otp=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'otp':userDetails.otp}).toArray((err,result)=>{
				err ? reject(err) :resolve(result)
			})
		})
	}
}

module.exports=new apiModel()