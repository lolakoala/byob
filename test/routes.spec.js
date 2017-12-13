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

  // describe('GET /api/v1/projects', () => {
  //   it('should return all of the projects', () => {
  //     return chai.request(server)
  //       .get('/api/v1/projects')
  //       .then(response => {
  //         response.should.have.status(200);
  //         response.should.be.json;
  //         response.body.should.be.a('array');
  //         response.body.length.should.equal(3);
  //         response.body[0].should.have.property('title');
  //         response.body[0].title.should.equal('seasons');
  //       })
  //       .catch(error => { throw error; });
  //   });
  // });

  describe('GET /api/v1/houses', () => {
    it('should return all houses', () => {
      return chai.request(server)
        .get('/api/v1/houses')
        .then(response => {
          response.should.have.status(200);
        })
        .catch(error => { throw error; });
    });
  });

  // describe('GET /api/v1/users', () => {
  //
  // });
  //
  // describe('GET /api/v1/users/:id', () => {
  //
  // });
  //
  // describe('GET /api/v1/houses/:id/users', () => {
  //
  // });
  //
  // describe('GET /api/v1/houses/:houseId/bills', () => {
  //
  // });
  //
  // describe('GET /api/v1/houses/:houseId/chores', () => {
  //
  // });
  //
  // describe('GET /api/v1/houses/:houseId/bulletins', () => {
  //
  // });
  //
  // describe('POST /api/v1/houses', () => {
  //
  // });
  //
  // describe('POST /api/v1/houses/:houseId/users', () => {
  //
  // });
  //
  // describe('POST /api/v1/houses/:houseId/bills', () => {
  //
  // });
  //
  // describe('POST /api/v1/houses/:houseId/chores', () => {
  //
  // });
  //
  // describe('POST /api/v1/houses/:houseId/bulletins', () => {
  //
  // });
  //
  // describe('PATCH /api/v1/houses/:id', () => {
  //
  // });
  //
  // describe('PATCH /api/v1/users/:id', () => {
  //
  // });
  //
  // describe('PATCH /api/v1/houses/:houseId/bills/:id', () => {
  //
  // });
  //
  // describe('PATCH /api/v1/houses/:houseId/chores/:id', () => {
  //
  // });
  //
  // describe('PATCH /api/v1/houses/:houseId/bulletins/:id', () => {
  //
  // });
  //
  // describe('DELETE /api/v1/houses/:houseId/bills/:id', () => {
  //
  // });
  //
  // describe('DELETE /api/v1/houses/:houseId/chores/:id', () => {
  //
  // });
  //
  // describe('DELETE /api/v1/houses/:houseId/bulletins/:id', () => {
  //
  // });
});
