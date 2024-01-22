const request = require('supertest')
const app = require('../app')

let id;

test('GET /directors should bring all directors ', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors should create a new director  ', async () => {
    newDirector ={
        firstName:'leonardo',
        lastName: 'DiCaprio',
        nationality:'American',
        image:'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/435_v9_bc.jpg',
        birthday: 11-11-1974
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test('PUT /directors/:id should update a director', async () => {
    const director = {
        firstName: 'leonardo actualizado',
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /directors/:id should remove an director ', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});
