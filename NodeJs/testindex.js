var express = require('express') 
var app = express() 
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose') 
var cors = require("cors");
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer');

var api = require('./Database/Controllers/api');
var imgModel = require('./model'); 
require('dotenv/config'); 

var app = express();

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
app.use(cors());
// Set EJS as templating engine  
app.set("view engine", "ejs"); 

mongoose.connect('mongodb://localhost:27017/CapstoneDB', 
    { useNewUrlParser: true, useUnifiedTopology: true }, err => { 
        console.log('connected') 
    });

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 

app.post('/api/products',upload.single('file'), (req, res, next) => { 
    //upload.single('file');
    console.log('inside the post of testindex');
    console.log("file body is",req.body);
    console.log("file is ",req.file);
    var obj = { 
        name: req.body.name, 
        brand: req.body.brand, 
        category: req.body.category,
        subcategory: req.body.subcategory,
        cost: req.body.cost,
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            item.save(); 
            //res.redirect('/'); 
            console.log("no error");
        } 
    });
}); 

app.get('/api', (req, res) => { 
    console.log("i am responding");
    imgModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            //console.log("the data is:",res);
            //res.send(items);
            console.log("length of the items is ",items.length);
            //res.send(items);
            for(let i=0;i<items.length;i++)
            {
                console.log("hello");
            }
            var base64 = items[0].img.data.toString('base64');
            //res.send(base64);
            res.json({
                'image':base64, 
                'desc':items[0].desc,
            });
            //res.render('app', { items: items }); 
        } 
    });
}); 

app.get('/api/allImages',(req,res) => {
    console.log("in the get all images");
    console.log("i am responding");
    imgModel.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            //console.log("the data is:",res);
            //res.send(items);
            var images=[];
            console.log("length of the items is ",items.length);
            //res.send(items);
            for(let i=0;i<items.length;i++)
            {
                var base64 = items[i].img.data.toString('base64');
                images.push(
                    {
                        'imgId': items[i]._id,
                        'img': base64,
                        'name': items[i].name,
                        'brand': items[i].brand,
                        'category': items[i].category,
                        'subcategory': items[i].subcategory,
                        'cost': items[i].cost,
                    }
                );
            }
            var base64 = items[0].img.data.toString('base64');
            //res.send(base64);
            res.json({
                'images':images, 
                'message':"all images present in the database",
            });
            //res.render('app', { items: items }); 
        } 
    });
});

app.get('/api/mens',(req,res) => {
    console.log("in the get all images");
    console.log("i am responding");
    imgModel.find({category:'Mens'}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            //console.log("the data is:",res);
            //res.send(items);
            var images=[];
            console.log("length of the items is ",items.length);
            //res.send(items);
            for(let i=0;i<items.length;i++)
            {
                var base64 = items[i].img.data.toString('base64');
                images.push(
                    {
                        'imgId': items[i]._id,
                        'img': base64,
                        'name': items[i].name,
                        'brand': items[i].brand,
                        'category': items[i].category,
                        'subcategory': items[i].subcategory,
                        'cost': items[i].cost,
                    }
                );
            }
            var base64 = items[0].img.data.toString('base64');
            //res.send(base64);
            res.json({
                'images':images, 
                'message':"all images present in the database",
            });
            //res.render('app', { items: items }); 
        } 
    });
});

app.get('/api/womens',(req,res) => {
    console.log("in the get all images");
    console.log("i am responding");
    imgModel.find({category:'Womens'}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            //console.log("the data is:",res);
            //res.send(items);
            var images=[];
            console.log("length of the items is ",items.length);
            //res.send(items);
            for(let i=0;i<items.length;i++)
            {
                var base64 = items[i].img.data.toString('base64');
                images.push(
                    {
                        'imgId': items[i]._id,
                        'img': base64,
                        'name': items[i].name,
                        'brand': items[i].brand,
                        'category': items[i].category,
                        'subcategory': items[i].subcategory,
                        'cost': items[i].cost,
                    }
                );
            }
            var base64 = items[0].img.data.toString('base64');
            //res.send(base64);
            res.json({
                'images':images, 
                'message':"all images present in the database",
            });
            //res.render('app', { items: items }); 
        } 
    });
});

app.get('/api/kids',(req,res) => {
    console.log("in the get all images");
    console.log("i am responding");
    imgModel.find({category:'Kids'}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            //console.log("the data is:",res);
            //res.send(items);
            var images=[];
            console.log("length of the items is ",items.length);
            //res.send(items);
            for(let i=0;i<items.length;i++)
            {
                var base64 = items[i].img.data.toString('base64');
                images.push(
                    {
                        'imgId': items[i]._id,
                        'img': base64,
                        'name': items[i].name,
                        'brand': items[i].brand,
                        'category': items[i].category,
                        'subcategory': items[i].subcategory,
                        'cost': items[i].cost,
                    }
                );
            }
            //res.send(base64);
            res.json({
                'images':images, 
                'message':"all images present in the database",
            });
            //res.render('app', { items: items }); 
        } 
    });
});

app.listen(3000, err => { 
    if (err) 
        throw err 
    console.log('Server started') 
});

app.use("/api", api);