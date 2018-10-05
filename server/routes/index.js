const express = require('express');
const { School, Student } = require('../db').models;
const router = express.Router();

router.get('/schools/:id', (req, res, next) => {
  School.findById(req.params.id, {
    include: [{ model: Student }],
  })
    .then(school => res.json(school))
    .catch(next);
});

router.get('/schools', (req, res, next) => {
  School.findAll()
    .then(schools => res.json(schools))
    .catch(next);
});

router.post('/schools', (req, res, next) => {
  console.log(req.body);
  School.create(req.body)
    .then(school => res.json(school))
    .catch(next);
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
    .catch(next);
});

router.get('/students/:id', (req, res, next) => {
  Student.findById(req.params.id, {
    include: [{ model: School }],
  })
    .then(student => res.json(student))
    .catch(next);
});

router.get('/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next);
});

router.put('/students/:id', (req, res, next) => {
  // console.log(req.body)
  // const { firstName, lastName, schoolId, gpa } = req.body;

  Student.findById(req.params.id).then(student =>
    student
      .update(req.body)
      .then(student => res.json(student))
      .catch(next)
  );
});

router.post('/students', (req, res, next) => {
  const { firstName, lastName, gpa, schoolId } = req.body;
  console.log(req.body);
  Student.create({ firstName, lastName, gpa }).then(student => {
    if (schoolId) {
      student.schoolId = schoolId;
      student
        .save()
        .then(student => res.json(student))
        .catch(next);
    } else {
      res.json(student);
    }
  });
});

router.delete('/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
