const express = require('express');
const app= express();
const{pool} = require("./databasepg");  
const morgan = require('morgan')
const dotenv = require('dotenv')
const port = process.env.PORT || 3110; 
const  authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const adminControllers = require('./controllers/adminControllers')
const cookieParser = require('cookie-parser')
const {requireAuth ,checkUser } = require('./middlewares/authMiddleWare')
const user = require('./models/users')
dotenv.config();
app.use(express.static('public'))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true})) // post işelmi sırasında değerleri göndermek için kullanılır.
app.use(morgan('tiny'))                        //middleware
app.use(cookieParser())

app.use('/admin',adminRoutes)
app.use('/',authRoutes)
app.use('*',checkUser)


    /* Sayfa Renderları :START */
    app.get('/product',(req,res)=>{
        adminControllers.get_product()
        .then((response)=>{
            res.render('product',{title:'Ürünler',database:response})
        })
        .catch((err)=>{
            res.redirect('404')
        })
    })
    app.post('/addItem',adminControllers.addItem)

    app.get('/addItem',adminControllers.addItem_get)
    app.get('/addSepet/:id',(req,res)=>{
        adminControllers.addSepet(req.cookies,req.params.id)
        .then((response)=>{
            res.redirect('/sepetim')
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    app.get('/sepetim',(req,res)=>{
        adminControllers.get_sepet(req.cookies)
        .then((response)=>{
            res.render('sepetim',{title:'sepet',database:response})
        })
    })
    app.get('/getcookie',  (req, res)=> {
        adminControllers.cookie(req.cookies)
        
    })
    
    app.get('/about',(req,res)=>{
        console.log("abaout çalıştı")
        res.render('abaout',{title:'Hakkımızda',user:user})
    })
    app.get('/warning',(req,res)=>{
        
        res.render('warning',{title:'Uyarı'})
    })
    app.get('/signup',requireAuth,(req,res)=>{
      
        res.render('signupByadmin',{title:'Hakkımızda',user:user})
    })
   
    
    app.post('/signup',checkUser,(req,res)=>{
        adminControllers.signup_post(req.body,req.cookies)
        .then((response)=>{
            response ==='eklendi' ? res.redirect('/about') : res.redirect('/404')
            res.status(200).send(response)
        }).catch((err)=>{
            res.status(500).send(err)
        })
    })
   
    

     /* Sayfa Renderları :END */

  
    
   

    /* MiddleWare İşelmleri ve Routeslar  */
    
    app.use((req,res)=>{
        res.status(404).render('404',{title:'HATA'})
    })
    

    app.listen(port, ()=>{

        console.log(`App running on port ${port}.`)
      
    })


