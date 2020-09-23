var mongoose = require('mongoose'); 

var imageSchema = new mongoose.Schema({ 
    name: String, 
    brand: String, 
    category: String,
    subcategory: String,
    cost: Number,
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
}); 
  
//Image is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('Image', imageSchema);