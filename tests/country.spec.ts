import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import Country from '../src/models/Country';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    //Country.collection.drop();
})
describe('test route /country', () => {

    const countryName: string = `name${Date.now()}`;
    const countryCoin: string = `${Date.now()}`;
    let id: any;

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
            expect(res.body.message).toEqual(`Country already exists`);
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
        id = country?._id;
        return request(app).get(`/country/${country?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(countryName)
        })
    })

    test('should update country with sucess', async () => {
        const country = await Country.findOne({name: countryName});
        console.log(country)
        return request(app).patch(`/country/${country?._id}`).send({
            coin: '$',
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Country updated with success');
        })
    })

    test('should delete country with sucess', async () => {
        const country = await Country.findOne({name: countryName});
        return request(app).delete(`/country/${country?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Country deleted with success');
        })
    })

    test('should not ruturn a country', async () => {
        return request(app).get(`/country/${id}`).then((res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('Country not found')
        })
    })

    test('should not update country with sucess', async () => {
        return request(app).patch(`/country/${id}`).send({
            coin: countryCoin + 'updated',
        }).then((res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual('Country not updated');
        })
    })
    test('should not delete country with sucess', async () => {
        return request(app).delete(`/country/${id}`).then((res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message).toEqual(`Country not deleted`);
        })
    })
    

    
})