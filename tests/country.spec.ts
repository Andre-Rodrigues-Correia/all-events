import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import Country from '../src/models/Country';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    Country.collection.drop();
})
describe('test route /country', () => {

    const countryName: string = `name${Date.now()}`;
    const countryCoin: string = `${Date.now()}`;

    test('should create country in database with sucess', async () => {
        return request(app).post('/country').send({
            name: countryName,
            coin: countryCoin,
        }).then((res) => {
            expect(res.status).toEqual(201)
            expect(res.body.name).toEqual(countryName);
            expect(res.body.coin).toEqual(countryCoin);
        })
    })

    test('should not create country in database with equal name', async () => {
        return request(app).post('/country').send({
            name: countryName,
            coin: countryCoin,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual(`E11000 duplicate key error collection: all-events-staging.countries index: name_1 dup key: { name: \"${countryName}\" }`);
        })
    })

    test('should not create country in database without name', async () => {
        return request(app).post('/country').send({
            coin: countryCoin,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required');
        })
    })

    test('should not create country in database without coin', async () => {
        return request(app).post('/country').send({
            name: countryName,
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('coin is required');
        })
    })
    test('should ruturn all countries', async () => {
        return request(app).get('/country/').then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        })
    })

    test('should ruturn a country', async () => {
        const country = await Country.findOne({name: countryName})
        return request(app).get(`/country/${country?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(countryName)
        })
    })

    test('should not ruturn a country', async () => {
        const country = await Country.findOne({name: countryName})
        return request(app).get(`/country/${country?._id + '1'}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual( `Cast to ObjectId failed for value "${country?._id  + '1'}" (type string) at path "_id" for model "Country"`)
        })
    })
})