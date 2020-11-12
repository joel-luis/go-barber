import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import './database';

const app = express();
app.use(bodyParser.json());
app.get('/', (request, response) => {
    return response.json({message: 'Hello Joel Luis'});
})

app.use(routes);

app.listen(3333, () => 
{
    console.log('🚀 Server Started on port 3333 🚀');
});