const express = require('express');
const { School, Student } = require('../db').models;
const router = express.Router();

router.get('/schools', (req, res, next) => {
  School.findAll()
    .then(schools => res.json(schools))
    .catch(next);
});

router.get('/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next);
});

module.exports = router;
