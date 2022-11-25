import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import City from '../src/models/City';
import { cityInterface, countryInterface, stateInterface } from '../src/interfaces/Interfaces';
import State from '../src/models/State';
import Country from '../src/models/Country';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    //City.collection.drop();
})
describe('test routes /city', () => {
    const cityName = `name${Date.now()}`
    const stateInitials: string = `Initials${Date.now()}`;
    let city: cityInterface | null;
    let state: stateInterface;
    let country: countryInterface;
    let validId: string;
    test('should create city with success', async () => {
        country = await Country.create({
            name: `Country${Date.now()}`,
            coin: '$',
        })
        state = await State.create({
            name: cityName,
            initials: stateInitials,
            country: country._id
        });

        return request(app).post('/city').send({
            name: cityName,
            state: state._id
        }).then((res) => {
            expect(res.status).toEqual(201);
            expect(res.body.name).toEqual(cityName);
        })
    })

    test('should not create city with equal names', async () => {
        return request(app).post('/city').send({
            name: cityName,
            state: state._id
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('City already exists');
        })
    })

    test('should not create city without name', async () => {
        return request(app).post('/city').send({
            state: state._id
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required')
        })
    })

    test('should not create city without state', async () => {
        return request(app).post('/city').send({
            name: cityName,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('state ID is required')
        })
    })

    test('should not create city with invalid state id', async () => {
        return request(app).post('/city').send({
            name: cityName,
            state: '1234'
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('state ID is invalid')
        })
    })

    test('should return all cities in database', async () => {
        return request(app).get('/city').then((res) => {
            expect(res.status).toEqual(200)
            expect(res.body.length).toBeGreaterThan(0);
        })
    })

    test('should return a city', async () => {
        city = await City.findOne({name: cityName});
        validId = city?._id;
        return request(app).get(`/city/${city?._id}`).then((res) => {
            expect(res.status).toEqual(200)
            expect(res.body.name).toEqual(city?.name)
        })
    })

    test('should not return a city with invalid id', async () => {
        city = await City.findOne({name: cityName});
        return request(app).get(`/city/${'1234'}`).then((res) => {
            expect(res.status).toEqual(400)
            expect(res.body.message).toEqual('invalid ID')
        })
    })

    test('should update city with success', async () => {
        return request(app).patch(`/city/${city?._id}`).send({
            name: `updated${cityName}`,
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('City updated with success');
        })
    })

    test('should not update city with invalid ID', async () => {
        return request(app).patch(`/city/${1234}`).send({
            name: `updated${cityName}`,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should delete city with success', async () => {
        return request(app).delete(`/city/${city?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('City deleted with success');
        })
    })

    test('should not update inexists city', async () => {
        return request(app).patch(`/city/${validId}`).send({
            name: `updated${cityName}`,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('City not updated');
        })
    })

    test('should not delete city with invalid ID', async () => {
        return request(app).delete(`/city/${1234}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should not delete inexists city', async () => {
        return request(app).delete(`/city/${validId}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('City not deleted');
        })
    })
})