import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import { localInterface } from '../src/interfaces/Interfaces';
import State from '../src/models/State';
import Country from '../src/models/Country';
import mongoose from 'mongoose';
import Local from '../src/models/Local';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    Local.collection.drop();
})
describe('test routes /local', () => {
    const genericName = `name${Date.now()}`
    const validID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
    let local: localInterface | null;

    test('should create local with success', async () => {
        return request(app).post('/local').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(201);
            expect(res.body.name).toEqual(genericName)
        })
    })

    test('should not create local with equal name', async () => {
        return request(app).post('/local').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Local already exists')
        })
    })

    test('should not create local without name', async () => {
        return request(app).post('/local').send({
            description: 'description',
            value: 100.00,
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required')
        })
    })

    test('should not create local without description', async () => {
        return request(app).post('/local').send({
            name: genericName,
            value: 100.00,
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('description is required')
        })
    })

    test('should not create local without value', async () => {
        return request(app).post('/local').send({
            name: genericName,
            description: 'description',
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('value is required')
        })
    })

    test('should not create local without type', async () => {
        return request(app).post('/local').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            type: [
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('type requires at least one type')
        })
    })

    test('should not create local without parcial address', async () => {
        return request(app).post('/local').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            }
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('addres must contain street, district, number, country, state and country')
        })
    })

    test('should not create local without complete address', async () => {
        return request(app).post('/local').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            type: [
                validID
            ],
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('addres must contain street, district, number, country, state and country')
        })
    })

    test('should return all locals', async () => {
        return request(app).get('/local').then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        })
    })

    test('should return a local', async () => {
        local = await Local.findOne({name: genericName})
        return request(app).get(`/local/${local?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(local?.name);
        })
    })

    test('should not return with invalid id', async () => {
        return request(app).get(`/local/1234`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should update local with success', async () => {
        return request(app).patch(`/local/${local?._id}`).send({
            name: `updated${genericName}`,
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Local updated with success')
        })
    })

    test('should not update local with invalid id', async () => {
        return request(app).patch(`/local/1234`).send({
            name: `updated${genericName}`,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID')
        })
    })

    test('should delete a local with success', () => {
        return request(app).delete(`/local/${local?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Local deleted with success')
        })
    })

    test('should not update inexists local', async () => {
        return request(app).patch(`/local/${local?._id}`).send({
            name: `updated${genericName}`,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Local not updated')
        })
    })

    test('should not delete a inexists local', () => {
        return request(app).delete(`/local/${local?._id}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Local not deleted')
        })
    })

})