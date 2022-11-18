import express from 'express';
import dotenv from 'dotenv'

//config .env
dotenv.config();

const app = express()

app.use(
    express.json(),
)

app.get('/', (req, res) => {
    res.send(200).send('tudo certo até aqui!')
})

export default app;