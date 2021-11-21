const jwt = require("jsonwebtoken")
const{pool} = require("../databasepg"); 
const User = require('../models/users')


const requireAuth =(req,res,next)=>{
    const token=req.cookies.jwt

    if(token){
        jwt.verify(token,'gizli kelime',(err,decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/')
            }else{
                console.log("decodedtoken2",decodedToken)
              
                next()
            }
        })
    }else{
        res.redirect('/')
    }
}

const checkUser = (req,res,next,sonuc)=>{
    const token=req.cookies.jwt

    if(token){
        jwt.verify(token,'gizli kelime',async (err,decodedToken)=>{
            if(err){
                console.log(err)
               res.locals.user=null
               
            }else{
                
                console.log("decodedtoken3",decodedToken)
               
                checkQuery(decodedToken.id)
                console.log(" res.locals.user", res.locals.user)
                next()
               
                
            }
           
        })
    }else{
       res.locals.user= null
     
    }
}
let  checkQuery = async(id,req,res)=>{
    try {
        const users = await pool.query(`select * from customers where id=$1`,[id]);
      
        res.locals.user = users.rows
    
    } catch (error) {
        console.log(error)
    }
}


module.exports = {requireAuth ,checkUser ,checkQuery}