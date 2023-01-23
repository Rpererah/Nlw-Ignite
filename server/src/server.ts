//Back-end API RESTful
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

const app=Fastify();
app.register(cors,{
    credentials:true,
    origin: true
});
app.register(appRoutes)



app.listen({
    port:3000
}).then(()=>{
    console.log(`HTTP Server Running porta 3000`);
});