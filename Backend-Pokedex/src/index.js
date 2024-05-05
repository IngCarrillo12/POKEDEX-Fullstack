import express, { urlencoded } from 'express'
import { PORT } from './config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import routesUsers from './routes/routesUsers.js'
import routesFavorites from './routes/routesFavorites.js'
const app = express()
app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// app.use('/favorites', routesFavorites)
app.use('/users', routesUsers)
app.use('/favorites', routesFavorites)
app.listen(PORT, ()=>console.log(`Servidor Ejecutado!! http://localhost:${PORT}`))