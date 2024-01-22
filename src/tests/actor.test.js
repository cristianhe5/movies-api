const request = require('supertest')
const app = require('../app')

let id;

test('GET /actors should bring all actors ', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors should create a new acrtor  ', async () => {
    newActor ={
        firstName:'leonardo',
        lastName: 'DiCaprio',
        nationality:'American',
        image:'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/435_v9_bc.jpg',
        birthday: 11-11-1974
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName);
});

test('PUT /actors/:id should update an actor', async () => {
    const actor = {
        firstName: 'leonardo actualizado',
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});

test('DELETE /actors/:id should remove an actor ', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
