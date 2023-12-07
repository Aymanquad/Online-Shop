const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
// let n = 2 ;

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));           // the JSON.parse() func will convrt the JSON stuff back to js objects/values 
    }
  });
};

module.exports = class Product {
  constructor(id , title, imageUrl, description, price) {                  // allows us to create new obj
    this.id =id ;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  };

  save() {
    // n = n+1 ; 
    getProductsFromFile(products => { 
    // console.log(this.id);
    // console.log(products[1].id);
    if(this.id){                                                           // this if statement is used if a prod alredy exists , and we r replacing it with updated data
      const existingProductsIndex = products.findIndex(prod =>  (prod.id).trim() === (this.id).trim() );
      const updatedProducts = [...products];
      updatedProducts[existingProductsIndex] = this;                 // here , "this" refers to as the updated product itself( including all its new details )
      
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {         
        console.log(err);                                         
      });       
      //console.log(updatedProducts);                                                
    }
    else{
    this.id = (Math.random()*10).toString();                     //To create an id whilst saving the prod
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {          // the JSON.stringify() func will change the js value into a JSON string
        console.log(err);                                          // Note: save() stores in JSON format , however the data stored in our file has to be converted back to strings for us 
      }); 
    };                                                         //        hence the conversion
    });
  };

  static deleteById(id){
    getProductsFromFile(products => {                                  
        const product = products.find(prod => prod.id.trim() === id.trim());

        const existingProductsIndex = products.findIndex(prod =>  (prod.id).trim() === (id).trim() );
        products.splice(existingProductsIndex ,1);          
        
        console.log("Muah1" , products);

        fs.writeFile(p, JSON.stringify(products), err => {         
          // console.log(err);  
          Cart.deleteProduct(id ,product.price);                                       
        });                                                     
      })
    }
  

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getByid(id , cb){                                  //gives us the product details with wtever id we search 
    getProductsFromFile(products =>{
      const product = products.find( prod => prod.id.trim() === id.trim() );
      cb(product);
    });
  }
};
