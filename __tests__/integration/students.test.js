const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const { generateToken } = require('../../src/utils/jwt');
const StudentModel = require('../../src/models/student.model');

const request = supertest(app);
// fetch, axios

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('/v1/students', () => {
  // hook
  beforeEach(async () => {
    await StudentModel.deleteMany({}).exec();
  });

  describe('POST', () => {
    const token = generateToken({ username: 'test' });
    const validStudentData = {
      firstName: 'john',
      lastName: 'doe',
      email: 'email@email.com',
    };

    it('should save the student if request is valid', async () => {
      // send POST /v1/students + body
      const res = await request
        .post('/v1/students')
        .set('Authorization', `Bearer ${token}`)
        .send(validStudentData);

      expect(res.statusCode).toBe(201);
      const student = await StudentModel.findOne(validStudentData).exec();
      expect(student).not.toBeNull();
      // toBe(null);
    });

    it.each`
      property       | value
      ${'firstName'} | ${undefined}
      ${'lastName'}  | ${undefined}
      ${'email'}     | ${'undefined'}
      ${'email'}     | ${'email@email'}
      ${'email'}     | ${'email@'}
    `(
      'should return 400 if $property is $value',
      async ({ property, value }) => {
        const invalidStudentData = {
          ...validStudentData,
          [property]: value,
        };
        const res = await request
          .post('/v1/students')
          .set('Authorization', `Bearer ${token}`)
          .send(invalidStudentData);

        expect(res.statusCode).toBe(400);
        const student = await StudentModel.findOne(invalidStudentData).exec();
        expect(student).toBeNull();
      }
    );
  });
});
