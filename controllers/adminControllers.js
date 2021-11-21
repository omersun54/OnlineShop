const{pool} = require("../databasepg"); 
const {User} = require('../models/users')
const bcrypt = require('bcrypt');



const addItem = async (json)=>{
 
      return new Promise(function(resolve,reject){
          pool.query(`insert into product(coment,title,fiyat)
          values ($1,$2,$3)`,[json.aciklama,json.baslik,json.fiyat],
          (error,results)=>{
              if(error){
                  console.error("add ıtem hata",error)
                  reject(error)
              }
              console.log("add İtem başarılı",User)
              resolve(results.rows)
          })
      })
    
} 
const addItem_get = (req,res)=>{
  
    res.render('addItem',{title:'Ürün Ekle'})  
}
const signup_post =async (json,customerid)=>{
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(json.password,salt)
    return new Promise(function(resolve,reject){
        let admin
        if(json.admin ==='on'){
            admin=1
        }else{
            admin=2
        }
        console.log("parseInt(customerid.rol)",parseInt(customerid.rol))
        if(parseInt(customerid.rol) !== 3){
            return res.redirect('/warning');
        }
        
        pool.query(`insert into customers(username,password,roles)
        values ($1,$2,$3)`,[json.username,hashedPassword,2],
        (error,results)=>{
            if(error){
                console.error("kullanıcı eklenirken hata oluştu",error)
                reject(error)
            }
            console.log("kullanıcı eklekm  başarılı",results.rows)
            
            resolve('eklendi')
        })
    })
}

const get_product = (req,res)=>{
 
    return new Promise(function(resolve,reject){
        pool.query(`select * from product`,[],
        (error,results)=>{
            if(error){
                console.error("product hata",error)
                reject(error)
            }
            console.log("product başarılı",results.rows)
            resolve(results.rows)
        })
    })
    
}
const cookie = (cook)=>{
    console.log(cook.rol)
   
}

const get_sepet = (customerid)=>{
   
    return new Promise(function(resolve,reject){
        pool.query(`select customers.id,product.id as pid, product.coment,product.title,product.fiyat,customers.username from sepetim s
        left join product on product.id= s.product_id  
        left join customers on customers.id=s.customer_id 
        where customers.id=$1`,[parseInt(customerid.rol)],
        (error,results)=>{
            if(error){
                console.error("add ıtem hata",error)
                reject(error)
            }
            console.log("asdasd",results.rows)
            resolve(results.rows)
        })
    })
}
const addSepet = (customerid,productid)=>{
    return new Promise(function(resolve,reject){
        pool.query(`insert into sepetim(customer_id,product_id)
        values ($1,$2)`,[parseInt(customerid.rol),productid],
        (error,results)=>{
            if(error){
                console.error("add ıtem hata",error)
                reject(error)
            }
            console.log("addsepet",results.rows)
            resolve(results.rows)
        })
    })
}


module.exports = {
    addItem,
    addItem_get,
    signup_post,
    get_product,
    get_sepet,
    cookie,
    addSepet
}