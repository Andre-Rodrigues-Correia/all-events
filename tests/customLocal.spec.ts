import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import { localInterface, cityInterface, countryInterface, stateInterface } from '../src/interfaces/Interfaces';
import mongoose from 'mongoose';
import Event from '../src/models/Event';
import City from '../src/models/City';
import Country from '../src/models/Country';
import State from '../src/models/State';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    //Event.collection.drop();
})
describe('test routes /local/(country or state or city)/:id', () => {
    const genericName = `name${Date.now()}`
    const cityName = `cityName${Date.now()}`
    const countryName = `countryName${Date.now()}`
    const stateName = `stateName${Date.now()}`
    const validID: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
    const start_date: Date = new Date;
    const end_date: Date = new Date;
    let local: localInterface | null;
    let country: countryInterface | null;
    let state: stateInterface | null;
    let city: cityInterface | null; 

    test('should return all locals in a city', async () => {
        country = await Country.create({
            name: countryName,
            coin: '$'
        });

        state = await State.create({
            name: stateName,
            initials: stateName,
            country: country._id
        })

        city = await City.create({
            name: cityName,
            state: validID,
        });
        local = await Event.create({
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
                city: city._id,
                state: state._id,
                country: country._id
            },
            start_date: start_date,
            end_date: end_date
        })
        return request(app).get(`/local/city/${city._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body[0].address.city).toEqual(city?._id.toString());
        })
    })

    test('should return all locals in a state', async () => {
        return request(app).get(`/local/state/${state?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body[0].address.state).toEqual(state?._id.toString());
        })
    })

    test('should return all locals in a country', async () => {
        return request(app).get(`/local/country/${country?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body[0].address.country).toEqual(country?._id.toString());
        })
    })

    test('should not return all locals in a country whith invalid id', async () => {
        return request(app).get(`/local/country/1234`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID');
        })
    })

    test('should not return all locals in a country whith inexists local', async () => {
        return request(app).get(`/local/country/000000000000000000000000`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('locals not found');
        })
    })


});
