const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', (done) => {
  before((done) => {
    knex.migrate.latest()
      .then(() => done())
      .catch(error => { throw error; });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => done())
      .catch(error => { throw error; });
  });

  describe('GET /api/v1/houses', () => {

  });

  describe('GET /api/v1/users', () => {

  });

  describe('GET /api/v1/users/:id', () => {

  });

  describe('GET /api/v1/houses/:id/users', () => {

  });

  describe('GET /api/v1/houses/:houseId/bills', () => {

  });

  describe('GET /api/v1/houses/:houseId/chores', () => {

  });

  describe('GET /api/v1/houses/:houseId/bulletins', () => {

  });

  describe('POST /api/v1/houses', () => {

  });

  describe('POST /api/v1/houses/:houseId/users', () => {

  });

  describe('POST /api/v1/houses/:houseId/bills', () => {

  });

  describe('POST /api/v1/houses/:houseId/chores', () => {

  });

  describe('POST /api/v1/houses/:houseId/bulletins', () => {

  });

  describe('PATCH /api/v1/houses/:id', () => {

  });

  describe('PATCH /api/v1/users/:id', () => {

  });

  describe('PATCH /api/v1/houses/:houseId/bills/:id', () => {

  });

  describe('PATCH /api/v1/houses/:houseId/chores/:id', () => {

  });

  describe('PATCH /api/v1/houses/:houseId/bulletins/:id', () => {

  });

  describe('DELETE /api/v1/houses/:houseId/bills/:id', () => {

  });

  describe('DELETE /api/v1/houses/:houseId/chores/:id', () => {

  });

  describe('DELETE /api/v1/houses/:houseId/bulletins/:id', () => {

  });
});
