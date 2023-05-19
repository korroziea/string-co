import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, vacancyCreateValidation } from './validations.js';

import { handleValidatinsErrors, checkAuth, roleMiddleware } from './utils/index.js';

import { UserController, VacancyController } from './controllers/index.js';

mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.dovbw6w.mongodb.net/vacancies?retryWrites=true&w=majority')   
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidatinsErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidatinsErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/tags', VacancyController.getLastTags);
app.get('/tags/:name', VacancyController.getByName);

app.get('/resume', VacancyController.getAll);
app.get('/resume/tags', VacancyController.getLastTags);
app.get('/resume/:id', VacancyController.getOne);
app.post(
    '/resume',  
    checkAuth, 
    roleMiddleware('ADMIN'), 
    vacancyCreateValidation, 
    handleValidatinsErrors,
    VacancyController.create);
app.post(
    '/resume/application',  
    checkAuth, 
    roleMiddleware('ADMIN'), 
    // vacancyCreateValidation, 
    handleValidatinsErrors,
    VacancyController.sendApplication);
// todo: end delete  
app.delete(
    '/resume/:id', 
    checkAuth, 
    roleMiddleware('ADMIN'),  
    VacancyController.remove);
app.patch(
    '/resume/:id', 
    checkAuth, 
    roleMiddleware('ADMIN'), 
    vacancyCreateValidation, 
    handleValidatinsErrors, 
    VacancyController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err); 
    }

    console.log('Server OK');
});