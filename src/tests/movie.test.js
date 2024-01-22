const request = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
require('../models')

let id;

test('GET /movies should bring all movies ', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies should create a new movie  ', async () => {
    newMovie ={
        name:'fast and furious',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRd7yNHzWZnaPTjxzZUaZO3WOKauO7kUBCCe_ISKDN5WxUUfR82',
        synopsis:"Dominic Toretto (Vin Diesel) enjoys the adrenaline of street car racing and his fans treat him like a rock star. After a blazing encounter with the ruthless Johnny Tran, Dom decides to take Brian (Paul Walker), a newcomer to street racing, under his wing. Dom's sister Mia sees something she likes in Brian, too. Trouble is, neither of them realize he's an undercover cop, and Dominic and his rival Johnny Tran are both the prime suspects in a case involving dirty money and big-rig hijacking",
        releaseYear:2001
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

test('PUT /movies/:id should update a movie', async () => {
    const movie = {
        name: 'fast and furious updated',
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/genres should insert the movies genre', async () => {
    const genre = await Genre.create({

        name:'genre test'
    }) 
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/actors should insert the movies actors', async () => {
    const actor = await Actor.create({

        firstName:'jonny ',
        lastName: 'Deep',
        nationality:'American',
        image:'https://imagen.com',
        birthday: 11-11-1974
    }) 
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors should insert the movies directors', async () => {
    const director = await Director.create({

        firstName:'director tes ',
        lastName: 'director lastname test',
        nationality:'American',
        image:'https://imagen.com',
        birthday: 11-11-1974
    }) 
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});


test('DELETE /movies/:id should remove an movie ', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});



