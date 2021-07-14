//=========================================================================
//SEEDING FILE
//=========================================================================
//We will be using this file to make the initial popupation of our DB.

//MONGOOSE ================================================================
const mongoose = require('mongoose');
//Import Mongoose Models
const Product = require('./models/product'); 
//Connect Mongoose to MongoDB
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
   console.log('MongoDB connection stabileshed')
})
.catch(err =>{
   console.log('MongoDB connection refused')
   console.log(err)
})

const seedProducts = [
   {
      name: 'Ruby Grapefruit',
      price: 1.99,
      sellUnity: 'weight',
      category: 'fruit' 
   },
   {
      name:'Large Red Eggs',
      price: 2.89,
      sellUnity: 'set',
      category: 'diary'
   },
   {
      name:'White Potatoes',
      price: 0.75,
      sellUnity: 'weight',
      category: 'vegetable'
   },
   {
      name:'Fairy Eggplant',
      price: 1.99,
      sellUnity: 'weight',
      category: 'vegetable'
   },
   {
      name:'Organic Goddess Melon',
      price: 4.99,
      sellUnity: 'unity',
      category: 'fruit'
   },
   {
      name:'Organic Mini Seedless Watermelon',
      price: 3.99,
      sellUnity: 'unity',
      category: 'fruit'
   },
   {
      name:'Orcanic Celery',
      price: 1.50,
      sellUnity: 'set',
      category: 'vegetable'
   },
   {
      name:'Chocolate Whole Milk',
      price: 2.69,
      sellUnity: 'set',
      category: 'diary'
   },
]

Product.insertMany(seedProducts)
.then(res =>{
   console.log(res)
   })
.catch(e=>{
   console.log(e)
})