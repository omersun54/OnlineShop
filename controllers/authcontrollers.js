const{pool} = require("../databasepg"); 
const bcrypt = require('bcrypt');
const jwtTokens = require("../utils/jwt_helpers");
const jwt =require('jsonwebtoken');
const { User } = require("../models/users");
const user = require('../models/users')
const maxAge =60*60*24
const createToken =(id)=>{
  
  return  jwt.sign({id}, 'gizli kelime', {expiresIn:maxAge})
}

const login_get = (req,res)=>{
    
    res.render('loginScreen',{title:'Giris'})  
}


const login_post = async(req,res)=>{
    try {
        
        const {username,password}= req.body
        const users = await pool.query(`select * from customers where username=$1`,[username]);
        
        if(users.rows.length === 0 ) return res.render('loginScreen',{title:'Giris',message:'Incorrect Username'})
        //password check
        const token = createToken(users.rows[0].id)
        const validPassword = await bcrypt.compare(password,users.rows[0].password)
        if(!validPassword) return res.render('loginScreen',{title:'Login',message:'Incorrect Password'}) //res.status(401).json({error:'ıncorrect password'}),
        res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000}) 
        res.cookie('rol',users.rows[0].id,{httpOnly:true, maxAge:maxAge*1000}) 
        var user = new User (users.rows[0].id,users.rows[0].roles,users.rows[0].username)
      
       return res.redirect('/about');
     
       
    } catch (error) {
        console.error('HATA',error)
    }
}

const log_out = async(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}


module.exports = {
    login_get,
    login_post,
    log_out,
   
}