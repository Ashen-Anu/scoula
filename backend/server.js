import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import connect from './database/conn.js';
import router from './router/route.js';

const app= express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port= 8080;

app.get('/',(req,res)=>{
    res.status(201).json("Home GET Request");
});

/** API routes  */
app.use('/api',router)




/** Start only when connection is valid */

connect().then(()=>{
    try {
        app.listen(port,()=>{
            console.log('server connected to http://localhost:8080');
        })
    } catch (error) {
        console.log('cannot connect to the server');
    }
}).catch(err=>{
    console.log(err);
})

