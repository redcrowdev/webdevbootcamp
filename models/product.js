//REQUIRE MONGOOSE ========================================================
const mongoose = require('mongoose')

//PRODUCT SCHEMA ========================================================
const productSchema = new mongoose.Schema({
   name:{
      type: String,
      required: true
   },
   price:{
      type: Number,
      required: true
   },
   sellUnity:{
      type: String,
      lowercase: true,
      enum: ['weight', 'unity', 'set'],
      required: true
   },
   category:{
      type: String,
      lowercase: true,
      enum:['fruit', 'vegetable', 'dairy'] //enum limits the value to what is inside the array.
   }
})

//"COMPILE" THE SCHEMA ====================================================
const Product = mongoose.model('Product', productSchema);

//EXPORT THE MODULE =======================================================
module.exports = Product;