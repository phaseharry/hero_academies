const express = require('express');
const { School, Student } = require('../db').models;
const router = express.Router();

router.get('/schools/:id', (req, res, next) => {
  School.findById(req.params.id, {
    include: [{ model: Student }],
  })
    .then(school => res.json(school))
    .catch(error => next(error));
});

router.get('/schools', (req, res, next) => {
  School.findAll()
    .then(schools => res.json(schools))
    .catch(error => next(error));
});

router.post('/schools', (req, res, next) => {
  School.create(req.body)
    .then(school => res.json(school))
    .catch(error => next(error));
});

router.delete('/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(204))
    .catch(error => next(error));
});

router.get('/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(error => next(error));
});

router.get('/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(error => next(error));
});

router.post('/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(error => next(error));
});

router.delete('/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(error => next(error));
});

module.exports = router;