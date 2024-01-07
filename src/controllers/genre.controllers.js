const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const genre = await Genre.findAll();
    return res.json(genre);
});

const create = catchError(async(req, res) => {
    const genre = await Genre.create(req.body);
    return res.status(201).json(genre);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);
    return res.json(genre);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Genre.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genre.update(
        req.body,
        { where: {id}, returning: true }
    );
    return res.json(genre);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}