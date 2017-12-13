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
    it('should return all houses', () => {
      return chai.request(server)
        .get('/api/v1/houses')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(8);
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('id');
          response.body[0].name.should.equal('test-DogHouse');
          response.body[0].should.have.property('secretKey');
          response.body[0].secretKey.should.equal('oiuhasrfou');
        })
        .catch(error => { throw error; });
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return all users', () => {
      return chai.request(server)
        .get('/api/v1/users')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(34);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('test-Lola');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return user id user exists', () => {
      return chai.request(server)
        .get('/api/v1/users/23')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('test-Julie');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });

    it('should return 404 if user does not exist', () => {
      return chai.request(server)
        .get('/api/v1/users/30098')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`No user for id 30098`);
        })
        .catch(error => { throw error; });
    });
  });

  describe('GET /api/v1/houses/:id/users', () => {
    it('s')
  });
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
