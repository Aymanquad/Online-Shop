// const route = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');     //accesing error controller

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');


const express = require('express');            //    for adding express stuff
const app = express();                          //

app.set('view engine' , 'ejs');            //telling express that we r using the template engine on pug/ejs files
app.set('views' , 'views');               // we using the view function on 'views' folder

app.use(bodyParser.urlencoded({extended:false}));          // parses the input info for us using the external middleware func , Bodyparser.
app.use(express.static(path.join(__dirname , 'public')));   // to access the 'public' folder throu express statically (elsewise , it can't access it)

app.use(adminRoute);
app.use(shopRoute);

app.use(errorController.get404)

app.listen(3000);  