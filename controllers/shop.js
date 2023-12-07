const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  // console.log( 'shop.js' , adminData.products);                       accessing the data from the admin file here
  // res.sendFile(path.join(__dirname , '../' , 'views' , 'shop.html'))
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pgTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req , res , next ) =>{
  const prod_id = req.params.productId ;                   // express provides an obj called params throu which u can access that name u gave it in routes.
  Product.getByid(prod_id , prod_details =>{               
    res.render('shop/product-detail' , {
      product : prod_details,
      pgTitle : prod_details.title,

    });
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', { 
      prods: products,
      pgTitle: 'Shop',
      path: '/'
    });
  });
};




exports.getCart = (req, res, next) => {

  Cart.getTheCart(cart =>{
    Product.fetchAll(products =>{
      console.log(cart.totalPrice);
      const cartProducts = [];
      for (product of products){
        cartProductData = cart.products.find(prod => prod.id.trim() === product.id.trim());
        if(cartProductData){
          cartProducts.push({productData : product , qty : cartProductData.qty });
        };
      };

      // console.log(cartProducts);

      res.render('shop/cart', {
        path: '/cart',
        pgTitle: 'Your Cart',
        products : cartProducts,
        totalPrice :cart.totalPrice
      });
    });
  });
};

exports.postCart = (req, res ,  next ) =>{
  const prodId = req.body.productId ;
  
  Product.getByid(prodId , product =>{     
    // console.log(prodId);
      Cart.addProduct(prodId , product.price);
  });
  res.redirect('/cart');
};


exports.postDeleteCartProduct = (req, res ,  next)=>{
  const prodId = req.body.productId;
  console.log(prodId);
  Product.getByid(prodId , product =>{
    Cart.deleteProduct(prodId, product.price);

    
    res.redirect('/cart');
  })
}

exports.postProductQtyUpdate = (req, res ,  next)=>{
  const prodId = req.body.productId;
  const qty = req.body.prodQty;
  console.log(prodId);
  Product.getByid(prodId , product =>{
    Cart.qtyUpdate(prodId , qty , product.price );

    
    res.redirect('/cart');
  })
}



exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pgTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pgTitle: 'Checkout'
  });
};
