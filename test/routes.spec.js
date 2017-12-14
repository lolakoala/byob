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
    it('should return all users for that house', () => {
      return chai.request(server)
        .get('/api/v1/houses/2/users')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('test-Amy');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });

    it('should return 404 if no users found', () => {
      return chai.request(server)
        .get('/api/v1/houses/30987/users')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`No saved users for house 30987`);
        })
        .catch(error => { throw error; });
    });
  });

  describe('GET /api/v1/houses/:houseId/bills', () => {
    it('should return all bills for a house', () => {
      return chai.request(server)
        .get('/api/v1/houses/4/bills')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('test-cable');
          response.body[0].should.have.property('total');
          response.body[0].total.should.equal('89.74');
          response.body[0].should.have.property('dueDate');
          response.body[0].dueDate.should.equal('12/20/17');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });

    it('should return 404 if no bills found', () => {
      return chai.request(server)
        .get('/api/v1/houses/10098')
        .then(response => {
          response.should.have.status(404);
          // response.should.be.json;
          // response.body.should.be.a('object');
          // response.body.should.have.property('error');
          // response.body.error.should.equal('No saved bills for house 10098');
        })
        .catch(error => { throw error; });
    });

    //test happy and sad path for query params
    it('should search bills by name', () => {
      return chai.request(server)
        .get('/api/v1/houses/1/bills?name=test-electricity')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('test-electricity');
          response.body[0].should.have.property('total');
          response.body[0].total.should.equal('101.23');
          response.body[0].should.have.property('dueDate');
          response.body[0].dueDate.should.equal('12/31/17');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });

    it('should return 404 if no bill by that name', () => {
      return chai.request(server)
        .get('/api/v1/houses/1/bills?name=test-cats')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`No bills have the name test-cats.`);
        })
        .catch(error => { throw error; });
    });
  });

  describe('GET /api/v1/houses/:houseId/chores', () => {
    it('should return all chores for a house', () => {
      return chai.request(server)
        .get('/api/v1/houses/1/chores')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('test-sweep the front deck');
          response.body[0].should.have.property('details');
          response.body[0].details.should.equal('test-get this done today!');
          response.body[0].should.have.property('userId');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });

    it('should return 404 if house has no chores', () => {
      return chai.request(server)
        .get('/api/v1/houses/10987/chores')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`No saved chores for house 10987`);
        })
        .catch(error => { throw error; });
    });
  });

  describe('GET /api/v1/houses/:houseId/bulletins', () => {
    it('should return all bulletins for a house', () => {
      return chai.request(server)
        .get('/api/v1/houses/1/bulletins')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('title');
          response.body[0].title.should.equal('test-May Bulletin');
          response.body[0].should.have.property('body');
          response.body[0].body.should.equal('test-May May May');
          response.body[0].should.have.property('houseId');
        })
        .catch(error => { throw error; });
    });

    it('should return 404 if house has no bulletins', () => {
      return chai.request(server)
        .get('/api/v1/houses/10987/bulletins')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`No saved bulletins for house 10987`);
        })
        .catch(error => { throw error; });
    });

  });
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
  describe('DELETE /api/v1/houses/:houseId/bills/:id', () => {
    it('should delete bill with id specified', () => {
      return chai.request(server)
        .del('/api/v1/houses/2/bills/2')
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should return 422 if no bill found', () => {
      return chai.request(server)
        .del('/api/v1/houses/2/bills/9898')
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`Could not find a bill with an id of 9898.`);
        })
        .catch(error => { throw error; });
    });
  });
  //
  // describe('DELETE /api/v1/houses/:houseId/chores/:id', () => {
  //
  // });
  //
  // describe('DELETE /api/v1/houses/:houseId/bulletins/:id', () => {
  //
  // });
});
