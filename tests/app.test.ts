import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';

describe('test app', () => {
    beforeAll(async () =>{
        connectDB();
    })


    test('teste', async () => {
        return request(app).get('/').then((res) => {
            expect(res.status).toEqual(200)
        })
    })
})