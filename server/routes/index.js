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

router.put('/schools/:id', (req, res, next) => {
  const { name, address, description } = req.body;
  School.findById(req.params.id).then(school =>
    school
      .update({ name, address, description })
      .then(school => res.json(school))
      .catch(next)
  );
});

router.delete('/schools/:id', (req, res, next) => {
  // console.log(req.params.id);
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(204))
    .catch(error => next(error));
});

router.get('/students/:id', (req, res, next) => {
  Student.findById(req.params.id, {
    include: [ { model : School  }]
  })
    .then(student => res.json(student))
    .catch(error => next(error));
});

router.get('/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(error => next(error));
});

router.put('/students/:id', (req, res, next) => {
  const { firstName, lastName, schoolId, gpa } = req.body;
  console.log(req.params.id)
  Student.findById(req.params.id)
  .then(student => student.update({firstName, lastName, schoolId, gpa})
  .then((student) => res.json(student))
  .catch(error => next(error))
  )
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
