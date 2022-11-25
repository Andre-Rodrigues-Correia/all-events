import express from 'express';
import dotenv from 'dotenv'
import router from './router';
import cors from 'cors';
//config .env
dotenv.config();

const app = express()

app.use(
    express.json(),
    cors(),
    router,
)

router.all('/*', (req, res) => {
    return res.status(404).json({message: 'route not found'})
})

export default app;