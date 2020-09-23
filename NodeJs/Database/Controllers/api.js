const express = require('express');
const router = express.Router();

var { User } = require('../Schema/User');

router.get('/',(req,res) => {
    console.log("listening at home");
    res.send("i am responding");
})

router.post('/register',(req, res) => {
    //console.log("in teh api.js file",req);
    let user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.mailId = req.body.email;
    user.password = req.body.password;
    User.findOne({mailId : req.body.email}, (err, existingUser) => {
        if(existingUser){
            res.json({
                success:false,
                message : 'Account already exists with the given mail id',
            });
        }
        else{
            user.save((err, doc) => {
                if(err)
                    console.log("error while saving"+JSON.stringify(err, undefined, 2));
                else{
                    res.json({
                        success:true,
                        message: "account created successfully",
                    })
                }
            });

        }
    });
});

router.post('/login',(req, res) => {
    //console.log("request is:",req.body);
    User.findOne({ mailId:req.body.email }, (err, user) => {
        if(err){
            console.log("error is:",err);
        }
        else if(!user){
            res.json({
                success:false,
                message:'no user exists with the given mail id'
            });
        }
        else{
            var isPasswordValid = user.password==req.body.password;
            //console.log("result from the search query is:",user);
            if(!isPasswordValid){
                res.json({
                    success:false,
                    message:'invalid password',
                });
            }
            else{
                res.json({
                    success:true,
                    message:'login successful',
                });
            }
        }
    });
});


router.put("/:id", (req,res) => {
    //console.log('resultes is',req.params.id);
    User.find({mailId:req.params.id}, (err, items) => {
        if(err){
            res.json({
                success: false, 
                message: err,
            });
        }
        else{
            //console.log("items is",items);
            //console.log("id is",items[0]._id);
            var newCartItem = [];
            if(items[0].cartItem){
                newCartItem = items[0].cartItem;
            }
            newCartItem.push(req.body);
            //console.log("new cartitems are",newCartItem);
            var newUser ={
                name : items[0].name,
                username : items[0].username,
                mailId : items[0].mailId,
                password : items[0].password,
                cartItem :newCartItem,
            } 
            User.findByIdAndUpdate(items[0]._id, { $set: newUser }, { new:true },(err,doc) => {
                if(err){
                    console.log("error");
                }
                else{
                    console.log("success");
                }
            })       
        }
    });
    //res.send("i am also responding");
});

router.get('/:email', (req, res) => {
    console.log("trying to fetch all the items", req.params.email);
    User.find({mailId : req.params.email}, (err, items) => {
        if(err){
            res.json({
                success : false,
                message : err,
            });
        }
        else{
            try{
            cartItems = items[0].cartItem;
            res.json({
                success : true, 
                items : cartItems, 
            });
            }
        catch(Exception){
            res.json({
                success : true, 
                items : [],
            })
        }
        }
    })
});

router.get('/orders/:email', (req, res) => {
    console.log("trying to fetch all the orders", req.params.email);
    User.find({mailId : req.params.email}, (err, items) => {
        if(err){
            res.json({
                success : false,
                message : err,
            });
        }
        else{
            try{
            orderedItems = items[0].orders;
            res.json({
                success : true, 
                items : orderedItems, 
            });
            }
        catch(Exception){
            res.json({
                success : true, 
                items : [],
            })
        }
        }
    })
});

router.put('/removecartitem/:id', (req, res) => {
    console.log("inside the remove cart item",req.body);
    User.find({mailId:req.params.id}, (err, items) => {
        if(err){
            res.json({
                success: false, 
                message: err,
            });
        }
        else{
            //console.log("items is",items);
            //console.log("id is",items[0]._id);
            var newCartItem = [];
            console.log("length of the cart is",items[0].cartItem.length);
            for(let i=0;i<items[0].cartItem.length;i++){
                console.log("inside for loop", items[0].cartItem[i].imgId, req.body.imgId)
                if(items[0].cartItem[i].imgId == req.body.imgId){
                    console.log("mathced")
                    continue;
                }
                newCartItem.push(items[0].cartItem[i])
            }
            console.log("cartitems are", newCartItem.length);
            //console.log("new cartitems are",newCartItem);
            var newUser ={
                name : items[0].name,
                username : items[0].username,
                mailId : items[0].mailId,
                password : items[0].password,
                cartItem :newCartItem,
            } 
            console.log("new cartiem", newUser.cartItem.length)
            User.findByIdAndUpdate(items[0]._id, { $set: newUser }, { new:true },(err,doc) => {
                if(err){
                    res.json({
                        success:false, 
                        message:err,
                    })
                }
                else{
                    res.json({
                        success:true, 
                        message:'delete successfully',
                    })
                }
            })       
        }
    });
});

router.put("/orders/:id", (req,res) => {
    //console.log('resultes is',req.params.id);
    console.log("inside the orders")
    User.find({mailId:req.params.id}, (err, items) => {
        if(err){
            res.json({
                success: false, 
                message: err,
            });
        }
        else{
            //console.log("items is",items);
            //console.log("id is",items[0]._id);
            var newOrderedItems = [];
            if(items[0].orders){
                newOrderedItems = items[0].orders;
            }
            newOrderedItems.push(req.body);
            //console.log("new cartitems are",newCartItem);
            var newUser ={
                name : items[0].name,
                username : items[0].username,
                mailId : items[0].mailId,
                password : items[0].password,
                cartItem :[],
                orders : newOrderedItems,
            } 
            User.findByIdAndUpdate(items[0]._id, { $set: newUser }, { new:true },(err,doc) => {
                if(err){
                    console.log("error");
                }
                else{
                    res.json({
                        success: true,
                        message: 'order placed successfully',
                    })
                    console.log("success");
                }
            })       
        }
    });
    //res.send("i am also responding");
});

module.exports = router;