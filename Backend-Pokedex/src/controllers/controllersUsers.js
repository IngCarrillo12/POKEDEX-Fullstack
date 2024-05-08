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
            res.status(200).send({ id, username, email, birthday, createdAt });
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message})
    }
}

export const signIn = async(req, res)=>{
    try {
        const {username, password} = req.body
        const [response] = await db.query('SELECT * FROM users WHERE username= ?',[username])
        if(response.length === 0){
            return res.status(404).send({message:"User no encontrado"})
        } 
        const user = response[0]
        const isMatch = await bcrypt.compare(password, user.password)
        delete user.password
       
        if(!isMatch){
            return res.status(404).send({message:"Credenciales invalidas"})
        } 
        const id = user.idusers
        jwt.sign({ id: id }, SECRETKEYPASSWORD, (err, token) => {
            if (err) return console.log(err);
            res.cookie('token', token);
            res.status(200).send(user);
        });   
    } catch (error) {
        res.status(500).send({message:error})
    }
}

export const logout = (req,res)=>{
    res.cookie('token', '',{
    expires: new Date(0)
   })
   return res.sendStatus(200);
}

export const updateUser = async(req, res)=>{
    try {
        const {username, password, birthday, email, iduser} = req.body
        if(password){
            const passwordHash = await bcrypt.hash(password, 10);
            const [response] = await db.query('UPDATE users SET username=?, password=?, birthday=?, email=? WHERE idusers=?', 
                                              [username, passwordHash, birthday, email, iduser]);
    
            if(response.affectedRows === 0){
                return res.status(404).send({message: "No se pudo actualizar el usuario"});
            }
            return res.status(200).send({message: "Usuario actualizado con éxito"});
        }
       const [response] = await db.query('SELECT password FROM users WHERE idusers=?', [iduser])
        const passwordResponse = response[0].password
        const [data] = await db.query('UPDATE users SET username=?, password=?, birthday=?, email=? WHERE idusers=?', 
                                              [username, passwordResponse, birthday, email, iduser]);
    
            if(data.affectedRows === 0){
                return res.status(404).send({message: "No se pudo actualizar el usuario"});
            }
            return res.status(200).send({message: "Usuario actualizado con éxito"});

    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error email/username ya se encuentran registrados'});
    }
}

