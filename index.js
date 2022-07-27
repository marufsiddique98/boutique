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

function connection(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'boutique'
    });
}

app.listen(3000);
app.use(bp.urlencoded({extends:true}));


//routes

app.get('/',function(req,res){
    var con=connection();
    
    
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
    var con=connection();
    con.query("SELECT * FROM cart INNER JOIN products ON cart.product_id=products.id WHERE cart.user_id='marufsiddique00@gmail.com'",(e,result)=>{
        return res.render('pages/cart',{
                cart:result
            });
    });
    
});
app.post('/cart-detele',function(req,res){
    var id=req.body.id;
    var con=connection();
    con.query("DELETE FROM cart WHERE product_id="+id,(e,result)=>{
        con.query("SELECT * FROM cart INNER JOIN products ON cart.product_id=products.id WHERE cart.user_id='marufsiddique00@gmail.com';",(e,result)=>{
            res.redirect('back');
        });
    });
    
});
app.get('/product/:id',function(req,res){
    var id=req.params.id;
    var sql="SELECT * FROM products WHERE id=";
    sql=sql.concat(id);
    sql=sql.concat(" LIMIT 1");
    var con=connection();
    con.query(sql,(e,result)=>{
        return res.render('pages/product-details',{
            product:result
        });
    });
    
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
            return res.render('pages/shop',{
                products:products,
                category:category,
            });
        });
    });
    
});
app.post('/add-to-cart',function(req,res){
    var con=connection();
    var id=req.body.id;
    var email=req.oidc.user.email;
    var sql="INSERT INTO cart(user_id,product_id,quantity) VALUES ('";
    sql=sql.concat(email);
    sql=sql.concat("',");
    sql=sql.concat(id);
    sql=sql.concat(",1)");
    con.query(sql,(e,result)=>{
        res.redirect('back');
    });
});
