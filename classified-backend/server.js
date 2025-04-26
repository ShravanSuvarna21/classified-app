import express from 'express';
import dotenv from 'dotenv';
import configDb from './config/db.js';
import cors from 'cors';
import User from './app/models/user-model.js';
import { checkSchema } from 'express-validator';
import {userRegisterValidation,userLoginValidation} from './app/validations/user-validator.js';
import IdValidation from './app/validations/id-validator.js';
import categoryValidation from './app/validations/category-validator.js';
import userControl from './app/controller/user-controller.js';
import categoryControl from './app/controller/category-controller.js';
import authenticate from './app/middlewares/authenticate.js';
import authorization from './app/middlewares/authorization.js';
import productValidation from './app/validations/product-validator.js';
import productControl from './app/controller/product-controller.js';

const app = express();
dotenv.config();
configDb();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
//admin
app.post('/register',  async (req, res, next) => {
    console.log("req",req)
    try {
      // Count users in the DB
      const userCount = await User.countDocuments();

      // First user becomes admin, rest are buyers
      req.body.role = userCount === 0 ? 'admin' : 'seller';

      next()  
     } 
      catch (err) {
        console.error('Error counting users:', err);
        res.status(500).json({ error: 'Server error during role setup' });
      }
    },checkSchema(userRegisterValidation),userControl.register);
app.post('/login',checkSchema(userLoginValidation),userControl.login);
app.get('/listAccount',authenticate,authorization(['admin']),userControl.listAccount);
app.get('/account',authenticate,authorization(['admin','seller','buyer']),userControl.account)//Try to get single account that logged in
app.put('/accounts/:id',checkSchema(IdValidation),authenticate,authorization(['admin','seller','buyer']),userControl.deactivateAccount);

//user
app.put('/user/profile',authenticate,authorization(['seller','buyer']),userControl.userManage)

//Category
app.post('/category',checkSchema(categoryValidation),authenticate,authorization(['admin']),categoryControl.register);
app.get('/category',categoryControl.listCategory);
app.put('/category/:id',authenticate,checkSchema(IdValidation),authorization(['admin']),categoryControl.Update);
app.delete('/category/:id',authenticate, checkSchema(IdValidation),authorization(['admin']), categoryControl.Delete);

//Product
app.post('/product',checkSchema(productValidation),authenticate,authorization(['seller']),productControl.create);
app.get('/product',productControl.listProduct);
app.put('/product/:id',authenticate, checkSchema(IdValidation),authorization(['admin','seller']), productControl.productUpdate);
app.delete('/product/:id',authenticate, checkSchema(IdValidation),authorization(['admin','seller']), productControl.productDelete);
app.put('/approveProduct/:id',authenticate,authorization(['admin']),productControl.productApprove);

//buyer

app.put('/enquries/:id',authenticate,authorization(['buyer','seller']),checkSchema(IdValidation),productControl.enquries);
//app.get('enquires',authenticate,authorization(['admin']),productControl.enquriesList)
app.listen(port,()=>{
    console.log('Server is running on the port '+port);
});
