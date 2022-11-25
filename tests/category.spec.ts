import request from 'supertest';
import app from '../src/server';
import { connectDB } from '../src/database/connection';
import { categoryInterface } from '../src/interfaces/Interfaces';
import Category from '../src/models/Category';

beforeAll(async () =>{
    connectDB();
})
afterAll(async () => {
    Category.collection.drop();
})

describe('test route /categoty', () => {
    const categoryName: string = `Name${Date.now()}`;
    let category:categoryInterface | null;

    test('should create category with sucess', () => {
        return request(app).post('/category').send({
            name: categoryName
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(categoryName);
        })
    });

    test('should not create category withot equal name', async () => {
        return request(app).post('/category').send({}).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('name is required');
        })
    });

    test('should not create category with equal name', async () => {
        return request(app).post('/category').send({
            name: categoryName
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Category already exists');
        })
    });

    test('should return all categories', async () => {
        return request(app).get('/category').then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0)
        })
    });

    test('should return a category', async () => {
        category = await Category.findOne({name: categoryName})
        return request(app).get(`/category/${category?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(categoryName)
        })
    });

    test('should update category with success', async () => {
        return request(app).patch(`/category/${category?._id}`).send({
            name: `updated${category?._id}`
        }).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Category updated with success')
        })
    });

    test('should not update category id invalid', async () => {
        return request(app).patch(`/category/${1234}`).send({
            name: `updated${category?._id}`
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('invalid ID')
        })
    });

    test('should delete category with sucess', async () => {
        return request(app).delete(`/category/${category?._id}`).then((res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Category deleted with success')
        })
    })

    test('should not delete category with sucess', async () => {
        return request(app).delete(`/category/${category?._id}`).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Category not deleted')
        })
    })

    test('should not update category with success', async () => {
        return request(app).patch(`/category/${category?._id}`).send({
            name: `updated${category?._id}`
        }).then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message).toEqual('Category not updated')
        })
    });


})