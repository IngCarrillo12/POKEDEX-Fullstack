import jwt from "jsonwebtoken"
import { SECRETKEYPASSWORD } from "../config.js"

export const authRequired = (req, res, next)=>{
    const {token} = req.cookies
    if(!token) return res.status(401).send({message: 'autorizacion denegada'})
    jwt.verify(token,SECRETKEYPASSWORD,(error,user)=>{
        if(error)return res.status(401).send({message: 'Token invalido'})
        req.user = user
        next();
})
}