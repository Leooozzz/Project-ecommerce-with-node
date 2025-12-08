import express, { NextFunction, Request, Response, urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { routes } from './routes/main'
import { configDotenv } from 'dotenv'

configDotenv()

const server=express()


server.use(cors())
server.use(helmet())

server.use('/webhook/stripe',express.raw({type: 'application/json'}))

server.use(express.static('public'))
server.use(express.json())

server.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.error(err)
    res.status(500).json({error:"Ocorreu algum erro"})
})
server.use(routes)

const port=process.env.PORT
server.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})



