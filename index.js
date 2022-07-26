var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');
var bp = require('body-parser');
//var session = require('express-session');
var { auth,requiresAuth } = require('express-openid-connect');

mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'boutique'
});

var app=express();

app.use(express.static('public'));
app.set('view engine','ejs');
// app.use(session,{secret:"secret"});
app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: 'https://dev-ow0u0hqx.us.auth0.com',
        baseURL: 'http://localhost:3000',
        clientID: 'HtD26hdw8HvSEfzxHyFfVuN5cWAYO6oY',
        secret: 'h7z3OCYsaOxbTbuAHZ4zzxojYPs9qlJ7hdTJ3sdgLDvpG9nb6lzCgoikQePWVQPG',
        clientSecret:'h7z3OCYsaOxbTbuAHZ4zzxojYPs9qlJ7hdTJ3sdgLDvpG9nb6lzCgoikQePWVQPG',
        idpLogout: true,
    })
  );

app.listen(3000);
app.use(bp.urlencoded({extends:true}));

app.get('/',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'boutique'
    });
    
    
    con.query("SELECT * FROM products",(e,result)=>{
        var products=result;
        con.query("SELECT * FROM category",(e,result)=>{
            var category=result;
            
            //return res.send(products);
            return res.render('pages/index',{
                products:products,
                category:category,
            });
        });
    });
    
    
    
});
app.get('/profile',function(req,res){
    return res.send(req.oidc.user.email);
});
app.get('/contact-us',function(req,res){
    return res.render('pages/contact-us');
});
app.get('/checkout',function(req,res){
    return res.render('pages/checkout');
});
app.get('/cart',function(req,res){
    return res.render('pages/cart');
});

app.get('/shop',function(req,res){
    var con=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'boutique'
    });
    
    
    con.query("SELECT * FROM products",(e,result)=>{
        var products=result;
        con.query("SELECT * FROM category",(e,result)=>{
            var category=result;
            
            //return res.send(products);
            return res.render('pages/index',{
                products:products,
                category:category,
            });
        });
    });
    
});
app.post('/add-to-cart',function(req,res){
    var id=req.body.id;
    var name=req.body.name;
    var price=req.body.price;
    var sell=req.body.sell;
    var img=req.body.img;
    var quantity=req.body.quantity;
    var product={
        id:id,
        name:name,
        price:price,
        sell:sell,
        img:img,
        quantity:quantity,
    }; 
});
