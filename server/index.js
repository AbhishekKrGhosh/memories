import express from "express";
import  bodyParser  from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import postRoutes from './routes/posts.js'


dotenv.config()

const app = express()

app.use('/posts', postRoutes)

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

const username = process.env.UNAME
const pwd = process.env.PWD
const CONNECTION_URL = `mongodb+srv://${username}:${pwd}@cluster0.bifs2nr.mongodb.net/`
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running at PORT: ${PORT}`)))
.catch((error)=>console.log(error))
