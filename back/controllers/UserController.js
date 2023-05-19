import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js'; 
import Role from '../models/Role.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const userRole = await Role.findOne({value: 'USER'});

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            //avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
            role: userRole.value,
        });
    
        const user = await doc.save();

        const token = jwt.sign(
            {
             _id: user._id,
             role: user.role,
            }, 
             'secret123',
            {
             expiresIn: '24h',
            },
        );
    
        const { passwordHash, ... userData } = user._doc;

        res.json({
            ... userData, 
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
           return res.status(404).json({
                message: 'Неверный логин или пароль',
           });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
           }); 
        }

        const token = jwt.sign(
            {
             _id: user._id,
             role: user.role,
            }, 
             'secret123',
            {
             expiresIn: '24h', 
            },
        );

        const { passwordHash, ... userData } = user._doc;

        res.json({
            ... userData, 
            token,
        });
    } catch (err) { 
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ... userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}