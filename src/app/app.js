import express from 'express';
import routes from './routes.js';
import cors from 'cors'

const app = express();


app.use(cors());

//express ler json
app.use(express.json());
//Usar o router
app.use(routes);

export default app;