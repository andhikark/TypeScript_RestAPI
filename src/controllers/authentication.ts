import express from 'express';

import { getUserByEmail,createUser } from '../db/users';
import { random, authentication } from '../helpers';


export const register = async (req: express.Request,res: express.Response) => {
    try{
        const{email, password, username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        const existringUser = await getUserByEmail(email);

        if(existringUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt, password),
            },
        });

    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}