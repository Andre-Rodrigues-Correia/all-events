import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import State from '../src/models/State';
import Country from '../src/models/Country';
import { countryInterface, stateInterface } from '../src/interfaces/Interfaces';
import { createCountry } from '../src/controllers/countryController';
import { response } from 'express';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    //State.collection.drop();
})
describe('test route /state', () => {
    const stateName: string = `Name${Date.now()}`;
    const stateInitials: string = `Initials${Date.now()}`;
    let country: countryInterface;
    let state: stateInterface | null;

    test('should create state with sucess', async () => {
        country = await Country.create({
            name: `Country${Date.now()}`,
            coin: '$',
        })
        return request(app).post('/state').send({
            name: stateName,
            initials: stateInitials,
            country: country._id,
        }).then((res) => {
            expect(res.status).toEqual(201);
            expect(res.body.name).toEqual(stateName);
        })
    });

    test('should not create state without name', async () => {
        return request(app).post('/state').send({
            initials: stateInitials,
            country: country._id,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required');
        })
    })

    test('should not create state without initials', async () => {
        return request(app).post('/state').send({
            name: stateName,
            country: country._id,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('initials is required');
        })
    })

    test('should not create state without initials', async () => {
        return request(app).post('/state').send({
            name: stateName,
            initials: stateInitials,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('country ID is required');
        })
    })

    test('should not create state with equals name', async () =>{
        return request(app).post('/state').send({
            name: stateName,
            initials: stateInitials,
            country: country._id,
        }).then((res) => {
            expect(res.body.message).toEqual('State already exists')
            expect(res.status).toEqual(400);
        })
    })

    test('should not create state with invalid country id', async () => {
        return request(app).post('/state').send({
            name: 'testeInvalidID',
            initials: 'testeInvalidID',
            country: '1234',
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('country ID is invalid');
        })
    });

    test('should return all states in database',async() => {
        return request(app).get('/state').then((res) =>{
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.status).toEqual(200);
        })
    })

    test('should return a state', async () => {
        state = await State.findOne({name: stateName});
        return request(app).get(`/state/${state?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(state?.name);
        })
    })

    test('should update state with sucess', async () =>{
        return request(app).patch(`/state/${state?._id}`).send({
            name: `${state?.name}updated`
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('State updated with success');
        })
    })

    test('should delete state with sucess', async () =>  {
        return request(app).delete(`/state/${state?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('State deleted with success');
        })
    })

    test('should not update state with sucess', async () =>{
        return request(app).patch(`/state/${state?._id}`).send({
            name: `${state?.name}updated`
        }).then((res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('State not updated');
        })
    })

    test('should not delete state with sucess', async () =>  {
        return request(app).delete(`/state/${state?._id}`).then((res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('State not deleted');
        })
    })

    test('should not return a state', async () => {
        return request(app).get(`/state/${state?._id}`).then((res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('State not found');
        })
    })


    test('should not return a state with invalid id', async () => {
        return request(app).get(`/state/1234`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should not delete state with invalid id', async () =>  {
        return request(app).delete(`/state/1234`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should not update state with invalid id', async () =>{
        return request(app).patch(`/state/1234`).send({
            name: `${state?.name}updated`
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

});
