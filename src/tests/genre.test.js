const request = require('supertest')
const app = require('../app')

let id;

test('GET /genres should bring all genres ', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres should create a new genres  ', async () => {
    newGenre ={
        name:'fantacy'
    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name);
});

test('PUT /genres/:id should update a genres', async () => {
    const genre = {
        name: 'fantacy updated',
    }
    const res = await request(app).put(`/genres/${id}`).send(genre);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test('DELETE /genres/:id should remove an genre ', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});
