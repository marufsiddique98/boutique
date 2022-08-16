var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');
var bp = require('body-parser');
var sessions = require('express-session');
var cookieParser = require('cookie-parser');

mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'boutique'
});

var app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));
app.set('view engine','ejs');
// app.use(session,{secret:"secret"});

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

var auth=(req,res,next)=>{
    if(req.session.logged){
        next()
    }
    else{
        res.redirect('/login')
    }
}

var con=  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'boutique'
    });

app.listen(3000);
app.use(bp.urlencoded({extends:true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static("."));


//routes

app.get('/',function(req,res){    
    var products;
    con.query("SELECT * FROM products",(e,result)=>{
        products=result;
    });
    con.query("SELECT * FROM category WHERE parent=0",(e,result)=>{
        var category=result;
        return res.render('pages/index',{
            products:products,
            category:category,
        });
    });
    
    
    
});
app.get('/profile',auth,function(req,res){
    
});
app.get('/contact-us',function(req,res){
    return res.render('pages/contact-us');
});
app.get('/checkout',auth,function(req,res){
    return res.render('pages/checkout');
});
app.get('/cart',auth,function(req,res){
    con.query(`SELECT * FROM cart INNER JOIN products ON cart.product_id=products.id WHERE cart.user_id=${req.session.userid}`,(e,result)=>{
        return res.render('pages/cart',{
                cart:result
            });
    });
    
});
app.post('/cart-detele',auth,function(req,res){
    var id=req.body.id;
    con.query("DELETE FROM cart WHERE product_id="+id,(e,result)=>{
        if(e){
            res.send(r)
            return
        }
        res.redirect('back');
    });
    
});
app.get('/product/:id',function(req,res){
    var id=req.params.id;
    
    con.query(`SELECT * FROM products WHERE id=${id} LIMIT 1`,(e,result)=>{
        return res.render('pages/product-details',{
            product:result[0]
        });
    });
    
});

app.post('/review',auth,(req,res)=>{
    var id=req.body.id;
    var name=req.body.name;
    var email=req.body.email;
    var txt=req.body.txt;
    con.query(`INSERT INTO review(name,email,txt,product_id) VALUES('${name}','${email}','${txt}',${id})`,(e,result)=>{
        res.redirect('back');
    });
})

app.get('/shop',function(req,res){
    var products;
    con.query("SELECT * FROM products",(e,result)=>{
        products=result;
    });
        con.query("SELECT * FROM category",(e,result)=>{
            var category=result;
            return res.render('pages/shop',{
                products:products,
                category:category,
            });
        });
    
});
app.post('/add-to-cart',auth,function(req,res){
    var id=req.body.id;
    
    con.query(`INSERT INTO cart(user_id,product_id) VALUES(${req.session.userid},${id})`,(e,result)=>{
        if(e){
            res.send(e) 
            return
        }
        res.redirect('/cart');
    });
});
app.post('/buy-now',auth,function(req,res){
    var id=req.body.id;
    res.redirect(`/buy/${id}`);
    
   
});
app.get('/buy/:id',auth,(req,res)=>{
    var id=req.params.id;
    con.query(`SELECT * FROM products WHERE id=${id}`,(e,result)=>{
        if(e){
            res.send(e) 
            return
        }
        res.render('pages/buy',{
            product:result[0],
            user_id:req.session.userid
        });
    });
})
app.get('/register',(req,res)=>{
    if(req.session.logged){
        res.redirect('/logout');
        return
    }
    res.render('pages/register')
})
app.get('/login',(req,res)=>{
    if(req.session.logged){
        res.redirect('/');
        return
    }
    res.render('pages/login')
})
app.get('/logout',auth,(req,res)=>{
    if(req.session.logged){
        req.session.logged=false
        req.session.id=null
        res.redirect('/');
        return
    }
})
app.post('/log-in',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    con.query(`SELECT id FROM users WHERE email='${email}' AND password='${password}'`,(e,r)=>{
        if(r){
            req.session.userid=r[0].id
            req.session.logged=true
            res.redirect('/');
        }
        else{
            res.render('pages/login')
        }
    })
    
})

app.post('/registration',(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var address=req.body.address;
    var password=req.body.password;
    con.query(`INSERT INTO users(name,email,phone,address,password) VALUES('${name}','${email}','${phone}','${address}','${password}')`,(e,r)=>{
        req.session.id=r[0].id
        req.session.logged=true
        res.redirect('/');
    })
})

app.post('/buy-confirm',auth,(req,res)=>{
    var id=req.body.id;
    var acc=req.body.acc;
    var trans=req.body.trans;
    con.query(`INSERT INTO buy(user_id,trans,account,product_id) VALUES('${req.session.userid}','${trans}','${acc}','${id}')`,(e,r)=>{
        if(e){
            res.send(e)
            return
        }
        res.render('pages/buy-confirm');
    })
})