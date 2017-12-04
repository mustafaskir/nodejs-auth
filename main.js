var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine","ejs");
app.use(express.static("public"));

var usersData = [
    {name:"Emi",pswd:"123",email:"ami@node.com",add:"Ger"},
];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/",function(req,res){
    var msg = {
        status:false,
        code:''
    };
    res.render("index",{msg:msg});
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.post("/home",urlencodedParser,function(req,res){

    if(req.body.signup == 'true'){
        usersData.push({name:req.body.name,pswd:req.body.pswd});
        res.render('home',{user:req.body});
        console.log('signup');
    }else{
        console.log('login');
        var user= usersData.findIndex(function(arr){
        return req.body.name === arr.name;
    });
    var pswd= usersData.findIndex(function(arr){
        return req.body.pswd === arr.pswd;
    });

    if(user == 0 && pswd == 0){
        res.render("home",{user:req.body});
    }else{
        var msg = {
            status:true,
            code:"User Credientals Errors, check user or pswd"
        };
        res.render("index",{msg:msg});
    }
    }
});

app.get('/signup',function(req,res){
    res.render("signup");
});

app.listen(8888);