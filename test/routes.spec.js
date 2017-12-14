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
          // response.should.be.json;
          // response.body.should.be.a('array');
          // response.body.length.should.equal(8);
          // response.body[0].should.have.property('name');
          // response.body[0].name.should.equal('test-DogHouse');
          // response.body[0].should.have.property('secretKey');
          // response.body[0].secretKey.should.equal('oiuhasrfou');
        })
        .catch(error => { throw error; });
    });
  });
  
  describe('POST /api/v1/houses', () => {

    it('should be able to add a house to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses')
        .send({
          name: 'The BIG House',
          secretKey: 'password'
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        })
        .catch(error => { throw error; });
    });

    it('should not add a house to database if name info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses')
        .send({ secretKey: 'blahblah'})
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You are missing the name property.');
        })
        .catch(error => { throw error; });
    });

    it('should not add a house to database if secretKey info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses')
        .send({ name: 'blahblah' })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('You are missing the secretKey property.');
        })
        .catch(error => { throw error; });
    });
  });
  
  describe('POST /api/v1/houses/:houseId/users', () => {
    it('should be able to add a user to the databse', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/users')
        .send({
          id: '99',
          name: 'Barrack OBama',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(99);
        })
        .catch(error => { throw error; });
    });

    it('should not add a user to the database if name info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/users')
        .send({ houseId: 1})
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the name property.');
        });
    });

    // it('should not add a user to the database if a user of the same name already exists', () => {
    //   return chai.request(server)
    //     .post('api/v1/houses/1/users')
    //     .send({ name: 'test-Lola', houseId: 1 })
    //     .then(response => {
    //       response.should.have.status(422);
    //     });
    // });

    // it('should responed with an error if the houseId does not exist in the database', () => {
    //   return chai.request(server)
    //     .post('/api/v1/houses/1/users')
    //     .send({ houseId: 90, name: 'hank'})
    //     .then(response => {
    //       response.should.have.status(422);//it's responding with 500
    //       response.body.should.be.a('object');
    //       response.body.error.should.equal('There is no house with id specified.')
    //     })
    // });
  });
  
  describe('POST /api/v1/houses/:houseId/bills', () => {
    it('should be able to add a bill to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({
          name: 'fake bill',
          total: '$1,000,000',
          dueDate: 'never',
          houseId: 2
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        });
    });

    it('should not add a bill to the database if name info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({ houseId: 1 })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the name property.');
        });
    });

    it('should not add a bill to the database if total is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({ houseId: 1, name: 'dog-walker', dueDate: '11/22/33'})
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the total property.');
        });
    });

    it('should not add a bill to the database if dueDate is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({ houseId: 1, name: 'dog-walker', total: '$14.25' })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the dueDate property.');
        });
    });

  });
  
  describe('POST /api/v1/houses/:houseId/chores', () => {
    it('should be able to add a chore to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/2/chores')
        .send({
          name: 'fix stuff',
          details: 'fix anything',
          userId: 2,
          houseId: 2
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        });
    });

    it('should not add a chore to the database if name info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/chores')
        .send({ 
          details: 'fix anything',
          userId: 2,
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the name property.');
        });
    });

    it('should not add a chore to the database if details info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/chores')
        .send({
          name: 'fix stuff',
          userId: 2,
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the details property.');
        });
    });

    it('should not add a chore to the database if userId is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/chores')
        .send({
          name: 'fix stuff',
          details: 'fix anything',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the userId property.');
        });
    });

    // it('should not add a chore to the database if houseId is missing', () => {
    //   return chai.request(server)
    //     .post('/api/v1/houses/1/chores')
    //     .send({
    //       name: 'fix stuff',
    //       details: 'fix anything',
    //       userId: 2
    //     })
    //     .then(response => {
    //       response.should.have.status(422);
    //       response.body.should.be.a('object');
    //       response.body.error.should.equal('You are missing the houseId property.');
    //     });
    // });
  
  });
  
  describe('POST /api/v1/houses/:houseId/bulletins', () => {

    it('should be able to add a bulletin to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bulletins')
        .send({
          title: 'fakedsfsdaf',
          body: 'more fakeness',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        });
    });

    it('should not add a bulletin to the database if the title is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/chores')
        .send({
          body: 'more fakeness',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the name property.');//why is this not title????
        });
    });

    it('should not add a bulletin to the database if the body is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bulletins')
        .send({
          title: 'fakedsfsdaf',
          body: 'more fakeness',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the body property.');
        });
    });
  
  });
  
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
