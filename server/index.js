import express from "express";
import  bodyParser  from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import postRoutes from './routes/posts.js'
import path from 'path'
dotenv.config()

const app = express()


app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

app.use('/posts', postRoutes)

const username = process.env.UNAME
const pwd = process.env.PWD
const CONNECTION_URL = `mongodb+srv://${username}:${pwd}@cluster0.c8yvr3l.mongodb.net/`
const PORT = 5000
//---------------deployment--------------//

const __dirname1 = path.resolve()
if(process.env.NODE_ENV=== 'production'){
    app.use(express.static(path.join(__dirname1,'/client/build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'))
    })
}
else{
    app.get('/', (req,res)=> {
        res.send("running successfully")
    })
}

//---------------deployment--------------//

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running at PORT: ${PORT}`)))
.catch((error)=>console.log(error))
