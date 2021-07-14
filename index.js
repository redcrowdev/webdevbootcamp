//=======================================================================
//APP REQUIREMENTS
//=======================================================================

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nocache = require('nocache');
const methodOverride = require('method-override');
const Product = require('./models/product'); 

//=======================================================================
//APP SERVICES
//=======================================================================

//Start Express =========================================================
const app = express();

//Start Mongoose ========================================================
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
   console.log('MongoDB connection stabileshed')
})
.catch(err =>{
   console.log('MongoDB connection refused')
   console.log(err)
})

//=======================================================================
//APP CONFIGURATION
//=======================================================================

//Set Middlewares =======================================================
app.use(express.urlencoded({extended:true})); //Extended HTTP reqs handling
app.use(methodOverride('_method')); //Enable requisition method override
app.use(nocache()); //Tell browsers to not cache the pages

//Cache Control =========================================================
app.set('etag', false);
app.use((req, res, next) => {
   res.set('Cache-Control', 'no-store')
   next()
 });

//Set Views Path and Relative Paths =====================================
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
 
//Set Default Render Engine =============================================
app.set('view engine', 'ejs');

//Mongoose Additional Config ============================================
mongoose.set('useFindAndModify', false);

//=======================================================================
//ROUTES SECTION
//=======================================================================

//Products route ========================================================
app.get('/products', async (req, res)=>{
   const products = await Product.find({})
   res.render('products/products', {products})
})

//product registration routes ============================================
app.get('/products/new', (req, res) => {
   res.render('products/new')
})

app.post('/products', async(req,res)=>{
   const newProduct = new Product(req.body);
   await newProduct.save();
   res.redirect(`/products/${newProduct._id}`)
})

//Products details route ================================================
app.get('/products/:id', async (req, res) =>{
   const {id} = req.params;
   const product = await Product.findById(id)
   res.render('products/show',{product})
})

//Product Update routes =================================================
app.get('/products/:id/edit', async (req, res)=>{
   const {id} = req.params;
   const product = await Product.findById(id);
   res.render('products/edit',{product})
})

app.put('/products/:id', async (req, res) => {
   const {id} = req.params;
   console.log(req.body)
   const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
   res.redirect(`/products/${product._id}`)
})

//Last Route - not found handler ========================================
// app.get('*', (req, res) => {
//    res.send(`<h1>Not Found</h1>`)
// })

//=======================================================================
//SERVER CONFIGURATION
//=======================================================================

app.listen(3000, () => {
   console.log('Server listening port 3000')
})
