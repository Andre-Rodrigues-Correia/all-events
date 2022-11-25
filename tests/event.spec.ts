import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import { eventInterface } from '../src/interfaces/Interfaces';
import mongoose from 'mongoose';
import Event from '../src/models/Event';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    Event.collection.drop();
})
describe('test routes /event', () => {
    const genericName = `name${Date.now()}`
    const validID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
    const start_date: Date = new Date;
    const end_date: Date = new Date;
    let event: eventInterface | null;

    test('should create event with success', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            organizer: 'organizer',
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
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(201);
            expect(res.body.name).toEqual(genericName)
        })
    })

    test('should not create event with equal name', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
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
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Event already exists')
        })
    })

    test('should not create event without name', async () => {
        return request(app).post('/event').send({
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
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
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required')
        })
    })

    test('should not create event without description', async () => {
        return request(app).post('/event').send({
            name: genericName,
            value: 100.00,
            organizer: 'organizer',
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
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('description is required')
        })
    })

    test('should not create event without value', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            organizer: 'organizer',
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
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('value is required')
        })
    })
    test('should not create event withou organizer', async () => {
        return request(app).post('/event').send({
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
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('organizer is required')
        })
    })

    test('should not create event without type', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
            type: [
            ],
            address: {
                street: 'rua 1',
                district: 'bairro 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('type requires at least one type')
        })
    })

    test('should not create event without parcial address', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
            type: [
                validID
            ],
            address: {
                street: 'rua 1',
                number: '1',
                city: validID,
                state: validID,
                country: validID
            },
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('addres must contain street, district, number, country, state and country')
        })
    })

    test('should not create event without start_date', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
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
            },
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('start_date is required')
        })
    })

    test('should not create event without end_date', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
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
            },
            start_date: start_date,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('end_date is required')
        })
    })

    test('should not create event without complete address', async () => {
        return request(app).post('/event').send({
            name: genericName,
            description: 'description',
            value: 100.00,
            organizer: 'organizer',
            type: [
                validID
            ],
            start_date: start_date,
            end_date: end_date
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('addres must contain street, district, number, country, state and country')
        })
    })

    test('should return all events', async () => {
        return request(app).get('/event').then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        })
    })

    test('should return a event', async () => {
        event = await Event.findOne({name: genericName})
        return request(app).get(`/event/${event?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(event?.name);
        })
    })

    test('should not return with invalid id', async () => {
        return request(app).get(`/event/1234`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should update event with success', async () => {
        return request(app).patch(`/event/${event?._id}`).send({
            name: `updated${genericName}`,
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Event updated with success')
        })
    })

    test('should not update event with invalid id', async () => {
        return request(app).patch(`/event/1234`).send({
            name: `updated${genericName}`,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID')
        })
    })

    test('should delete a event with success', () => {
        return request(app).delete(`/event/${event?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Event deleted with success')
        })
    })

    test('should not update inexists event', async () => {
        return request(app).patch(`/event/${event?._id}`).send({
            name: `updated${genericName}`,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Event not updated')
        })
    })

    test('should not delete a inexists event', () => {
        return request(app).delete(`/event/${event?._id}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Event not deleted')
        })
    })

})