import express from 'express';
import dotenv from 'dotenv'
import router from './router';
//config .env
dotenv.config();

const app = express()

app.use(
    express.json(),
    router
)

app.get('/', (req, res) => {
    res.status(200).send('tudo certo até aqui!')
})

export default app;