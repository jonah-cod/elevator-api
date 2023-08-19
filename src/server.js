const express = require('express');
require("dotenv").config();
const IP = require('ip');

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
      const ipAddress = IP.address();
      res.send(ipAddress)
})
app.use((req, res, next)=>{
      const notFound = {
            status: 404,
            message: 'route not found'
      };
      next(notFound)
})

app.use((err, req, res, next)=>{
      res.status(err.status).json({...err})
})
const port = process.env.PORT
app.listen(port, ()=>console.log(`server listening on port: ${port}`))


