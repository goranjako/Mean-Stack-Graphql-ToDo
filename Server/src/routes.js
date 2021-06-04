
import express from 'express';
const {validateRegistrationBody,validateLoginBody, validate} = require('./config/verifi');
import passportMenager from './config/passport';
import authController from './controllers/auth.controller';
import userController from './controllers/users';
export default function setRoutes(app) {

    const router = express.Router();
    


    router.route('/register').post(validateRegistrationBody(),validate,authController.register);
    router.route('/login').post(validateLoginBody(),validate,authController.login);

    router.route('/users').get(passportMenager.authenticate,userController.getAll);
    router.route('/user/:id').get(passportMenager.authenticate,userController.getById);
    router.route('/user/:id').put(passportMenager.authenticate,userController.put);
    router.route('/user/:id').delete(passportMenager.authenticate,userController.delete);

app.use('/', router);
}