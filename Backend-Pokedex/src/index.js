import express, { urlencoded } from 'express'
import { PORT } from './config.js'
import routesFavorites from './routes/routesFavorites.js'
import routesUsers from './routes/routesUsers.js'
const app = express()
app.use(urlencoded({extended:true}))
app.use(express.json())

// app.use('/favorites', routesFavorites)
app.use('/users', routesUsers)
app.listen(PORT, ()=>console.log(`Servidor Ejecutado!! http://localhost:${PORT}`))