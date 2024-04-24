import express from 'express';
import { connection } from '../../db.js';

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    const { email, password } = req.body;

    // let isUniqueUserEmail = true;

    // for (const user of users) {
    //     if (user.email === email) {
    //         isUniqueUserEmail = false;
    //         break;
    //     }
    // }

    // if (isUniqueUserEmail) {
    //     users.push({
    //         id: ++lastUserId,
    //         email,
    //         password,
    //         cars: [],
    //     });
    //     console.log(users);

    //     return res.send(JSON.stringify({
    //         type: 'success',
    //         message: 'User successfully registered'
    //     }));
    // }

    return res.send(JSON.stringify({
        type: 'error',
        message: 'User already exists'
    }));
});

authRouter.post('/login', (req, res) => {
    const { email, password } = req.body;
    // let userId = -1;

    // for (const user of users) {
    //     if (user.email === email &&
    //         user.password === password) {
    //         userId = user.id;
    //         break;
    //     }
    // }

    // if (userId > 0) {
    //     return res.send(JSON.stringify({
    //         message: 'User successfully logged in',
    //         loggedIn: true,
    //         userId,
    //     }));
    // }

    return res.send(JSON.stringify({
        message: 'Such user does not exist',
        loggedIn: false,
    }));
});

export { authRouter };