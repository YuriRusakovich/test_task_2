import request from 'supertest';
import app from '../server';
import db from '../models';

describe('Users routes', () => {
    it('should get all users', async () => {
        const res = await request(app)
            .get('/users');
        expect(res.statusCode).toEqual(200);
    });

    it('should get user by id', async () => {
        const res = await request(app)
            .get('/users/1');
        expect(res.statusCode).toEqual(200);
    });

    it('should update user rating by id', async () => {
        const res = await request(app)
            .put('/users/1')
            .send({
                rating: 1
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should throw error on update', async () => {
        const res = await request(app)
            .put('/users/b')
            .send({
                rating: 1
            });
        expect(res.statusCode).toEqual(500);
    });

    it('should delete user by id', async () => {
        const res = await request(app)
            .get('/users');
        const deleteRes = await request(app)
            .delete(`/users/${res.body.length}`);
        expect(deleteRes.statusCode).toEqual(200);
    });

    it('should throw error on delete', async () => {
        const deleteRes = await request(app)
            .delete(`/users/b`);
        expect(deleteRes.statusCode).toEqual(500);
    });

    it('should catch 500 error', async () => {
        const res = await request(app)
            .get('/users/b');
        expect(res.statusCode).toEqual(500);
    });

    it('should catch 404 error', async () => {
        const res = await request(app)
            .get('/user/1');
        expect(res.statusCode).toEqual(404);
    });
});

afterAll(async () => {
    app.close();
    db.sequelize.close();
});
