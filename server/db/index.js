const Sequelize = require('sequelize');
const faker = require('faker');
const connection = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/hero_academy',
  { logging: false }
);

const School = connection.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

const Student = connection.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gpa: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

School.hasMany(Student);
Student.belongsTo(School);

const syncAndSeed = () => {
  connection.sync({ force: true }).then(() => {
    return Promise.all([
      School.create({
        name: 'U.A. High School',
        address: 'Tokyo 173-000, Japan',
        description:
          'U.A. is the #1 ranked high school for heroics and is considered as the top Hero Academy in Japan. Students are separated into specific Departments and Classes - A, B, C, D, E, F, G, H, I, J and K. At the entrance, there is a security wall nicknamed the "U.A. Barrier" that automatically closes if a person does not have a Student ID Card or Special Entry Permission ID. Many precautions have been made to keep members of the press and villains out.',
      }),
      School.create({
        name: 'Shiketsu High School',
        address: faker.address.streetAddress(),
        description: `Shiketsu High School teaches their students to value their obligation as heroes as well as maintain their dignity at all times. Students are required to wear their uniform hats while working because they must represent their school and always uphold Shiketsu's values. Shiketsu students wear white collared shirts and dark pants along with their blue and orange uniform hats.[2] Their uniforms also include a dark jacket with the Shiketsu logo printed on the collar.`,
      }),
    ]).then(([UAHS, SHS]) => {
      return Promise.all([
        Student.create({
          firstName: 'Izuku',
          lastName: 'Midoriya',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Katsuki',
          lastName: 'Bakugo',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Shoto',
          lastName: 'Todoroki',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Mezo',
          lastName: 'Shoji',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Mina',
          lastName: 'Ashido',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Ochaco',
          lastName: 'Uraraka',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Minoru',
          lastName: 'Mineta',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Inasa',
          lastName: 'Yoarashi',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Nagamasa',
          lastName: 'Mora',
          gpa: faker.random.number(4),
        }),
        Student.create({
          firstName: 'Seiji',
          lastName: 'Shishikura',
          gpa: faker.random.number(4),
        }),
      ]).then(([s1, s2, s3, s4, s5, s6, s7, s8, s9, s10]) => {
        s1.schoolId = UAHS.id;
        s2.schoolId = UAHS.id;
        s3.schoolId = UAHS.id;
        s4.schoolId = UAHS.id;
        s5.schoolId = UAHS.id;
        s6.schoolId = UAHS.id;
        s7.schoolId = UAHS.id;
        s8.schoolId = SHS.id;
        s9.schoolId = SHS.id;
        s10.schoolId = SHS.id;
        const students = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];
        return Promise.all(students.map(student => student.save()));
      });
    });
  });
};

module.exports = {
  syncAndSeed,
  models: {
    School,
    Student,
  },
};
