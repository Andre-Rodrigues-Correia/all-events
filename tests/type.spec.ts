import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import { typeInterface } from '../src/interfaces/Interfaces';
import Type from '../src/models/Type';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    Type.collection.drop();
})

describe('test route /type', () => {
    const typeName: string = `Name${Date.now()}`;
    let type:typeInterface | null;

    test('should create type with sucess', () => {
        return request(app).post('/type').send({
            name: typeName
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(typeName);
        })
    });

    test('should not create type withot equal name', async () => {
        return request(app).post('/type').send({}).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required');
        })
    });

    test('should not create type with equal name', async () => {
        return request(app).post('/type').send({
            name: typeName
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Type already exists');
        })
    });

    test('should return all categories', async () => {
        return request(app).get('/type').then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0)
        })
    });

    test('should return a type', async () => {
        type = await Type.findOne({name: typeName})
        return request(app).get(`/type/${type?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(typeName)
        })
    });

    test('should update type with success', async () => {
        return request(app).patch(`/type/${type?._id}`).send({
            name: `updated${type?._id}`
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Type updated with success')
        })
    });

    test('should not update type id invalid', async () => {
        return request(app).patch(`/type/${1234}`).send({
            name: `updated${type?._id}`
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID')
        })
    });

    test('should delete type with sucess', async () => {
        return request(app).delete(`/type/${type?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Type deleted with success')
        })
    })

    test('should not delete type with sucess', async () => {
        return request(app).delete(`/type/${type?._id}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Type not deleted')
        })
    })

    test('should not update type with success', async () => {
        return request(app).patch(`/type/${type?._id}`).send({
            name: `updated${type?._id}`
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Type not updated')
        })
    });


})