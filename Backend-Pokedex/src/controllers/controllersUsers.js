import { db } from "../db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {SECRETKEYPASSWORD} from '../config.js'
export const createUser = async(req,res)=>{
    try {
        const {username, email, password, birthday} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const createdAt = new Date()
        const [response] = await db.query('INSERT INTO users (username, email, password, birthday, createdAt) VALUES (?, ?, ?, ?, ?)', [username, email, passwordHash, birthday, createdAt])

        if(response.affectedRows === 0) return res.status(400).send({message: 'Registro invalido!!'})
        const id = response.insertId
        jwt.sign({ id: id }, SECRETKEYPASSWORD, (err, token) => {
            if (err) return console.log(err);
            res.cookie('token', token);
            res.status(200).send({ id, username, email, password, birthday, createdAt });
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
}
