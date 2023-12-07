const Product = require('../models/product');

exports.getAddProduct = (req ,res, next) =>{
  //console.log("This is the middleware provided by express!");
  res.render('admin/edit-product' , {                                  
    pgTitle : 'Add to Cart',
    path : '/admin/add-product',
    editing : false
  });
  //next();                            basically , allows the control flow to go to the next middleware in line .
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);  //creates an object of Product class from model with these 4 parameters
  product.save();
  res.redirect('/');
};


exports.getEditProduct = (req ,res, next) =>{
  
  const editMode = req.query.edit ; 
  if(!editMode){
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  Product.getByid( prodId , product =>{
      if(!product){
        res.redirect('/');
      }

    res.render('admin/edit-product' , {                                  
      pgTitle : 'Edit your Product',
      path : '/admin-products/edit-product',
      editing : editMode ,
      product : product
  });
  
  });
};


exports.postEditProduct = (req, res , next ) =>{
  const prodid = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedProduct =new  Product(prodid,updatedTitle, updatedImageUrl, updatedDesc, updatedPrice); 

  // console.log(updatedProduct);
  updatedProduct.save();
  res.redirect('/admin-products');
}


exports.postDeleteProduct = (req , res , next ) => {
  const prodid = req.body.productId;
  Product.deleteById(prodid);
  res.redirect('/admin-products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {                    // Using the Product obj and the func to access all the products that were created 
    res.render('admin/products', {
      prods: products,
      pgTitle: 'Admin Products',
      path: '/admin-products'
    });
  });
};
