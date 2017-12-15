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
    it('should return user id if user exists', () => {
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
        })
        .catch(error => { throw error; });
    });

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

  describe('POST /api/v1/houses', () => {
    it('should be able to add a house to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses')
        .send({
          name: 'The BIG House',
          secretKey: 'password',
          id: '99'
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
        })
        .catch(error => { throw error; });
    });

    it('should not add a user to the database if a user of the same name already exists', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/users')
        .send({ name: 'test-Lola', houseId: 1 })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('A user with that name already exists in the house specified.');
        })
        .catch(error => { throw error; });
    });

    it('should responed with an error if the houseId does not exist in the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/90/users')
        .send({  name: 'hank'})
        .then(response => {
          response.should.have.status(500);
        })
        .catch(error => { throw error; });
    });
  });

  describe('POST /api/v1/houses/:houseId/bills', () => {
    it('should be able to add a bill to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({
          id: '99',
          name: 'fake bill',
          total: '$1,000,000',
          dueDate: 'never',
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        })
        .catch(error => { throw error; });
    });

    it('should not add a bill to the database if name info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({ houseId: 1 })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });

    it('should not add a bill to the database if total is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({ name: 'dog-walker', dueDate: '11/22/33'})
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });

    it('should not add a bill to the database if dueDate is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bills')
        .send({ name: 'dog-walker', total: '$14.25' })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });
  });

  describe('POST /api/v1/houses/:houseId/chores', () => {
    it('should be able to add a chore to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/2/chores')
        .send({
          id: '99',
          name: 'fix stuff',
          details: 'fix anything',
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        })
        .catch(error => { throw error; });
    });

    it('should not add a chore to the database if name info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/chores')
        .send({
          details: 'fix anything',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });

    it('should not add a chore to the database if details info is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/chores')
        .send({
          name: 'fix stuff',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });
  });

  describe('POST /api/v1/houses/:houseId/bulletins', () => {
    it('should be able to add a bulletin to the database', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bulletins')
        .send({
          id: '99',
          title: 'fakedsfsdaf',
          body: 'more fakeness'
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
        })
        .catch(error => { throw error; });
    });

    it('should not add a bulletin to the database if the title is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bulletins')
        .send({
          body: 'more fakeness'
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });

    it('should not add a bulletin to the database if the body is missing', () => {
      return chai.request(server)
        .post('/api/v1/houses/1/bulletins')
        .send({
          title: 'fakedsfsdaf'
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
        })
        .catch(error => { throw error; });
    });
  });

  describe('PATCH /api/v1/houses/:id', () => {
    it('should be able to update a house record', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1')
        .send({
          name: 'The BIG House',
          secretKey: 'password'
        })
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a house record if the user is trying to change the id', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1')
        .send({
          name: 'The BIG House',
          secretKey: 'password',
          id: 123232
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You cannot change a house id.');
        })
        .catch(error => { throw error; });
    });

    it('return an error if the houseId does not exist', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1353454566')
        .send({
          name: 'The BIG House',
          secretKey: 'password'
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.error.should.contain('Cannot find a house with the id of');
        })
        .catch(error => { throw error; });
    });
  });

  describe('PATCH /api/v1/users/:id', () => {
    it('should be able to update a user record', () => {
      return chai.request(server)
        .patch('/api/v1/users/1')
        .send({
          name: 'adfdsLola',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a user record if the user is trying to change the id', () => {
      return chai.request(server)
        .patch('/api/v1/users/1')
        .send({
          name: 'adfdsLola',
          houseId: 1,
          id: 1
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You cannot change a user id.');
        })
        .catch(error => { throw error; });
    });

    it('return an error if the userId does not exist', () => {
      return chai.request(server)
        .patch('/api/v1/users/1353454566')
        .send({
          name: 'adfdsLola',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.error.should.contain('Cannot find a user with the id of');
        })
        .catch(error => { throw error; });
    });
  });

  describe('PATCH /api/v1/houses/:houseId/bills/:id', () => {
    it('should be able to update a bill record', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/bills/1')
        .send({
          name: 'test-electricity',
          total: '101,000,000.23',
          dueDate: '12/31/17',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a bill record if the record does not exist', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/bills/100')
        .send({
          name: 'test-electricity',
          total: '101,000,000.23',
          dueDate: '12/31/17',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.error.should.contain('Cannot find a bill with the id of');
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a bill record if the user is trying to change the id', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/bills/1')
        .send({
          name: 'test-electricity',
          total: '101,000,000.23',
          dueDate: '12/31/17',
          houseId: 1,
          id: 65
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You cannot change a bill id.');
        })
        .catch(error => { throw error; });
    });
  });

  describe('PATCH /api/v1/houses/:houseId/chores/:id', () => {
    it('should be able to update a chore record', () => {
      return chai.request(server)
        .patch('/api/v1/houses/2/chores/2')
        .send({
          name: 'fixedxxx stuff',
          details: 'fix anything ANYTHING!',
          houseId: 2
        })
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a bill record if the record does not exist', () => {
      return chai.request(server)
        .patch('/api/v1/houses/2/chores/100')
        .send({
          name: 'fixedxxx stuff',
          details: 'fix anything ANYTHING!'
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.error.should.contain('Cannot find a chore with the id of');
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a chore record if the user is trying to change the id', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/chores/1')
        .send({
          name: 'fixedxxx stuff',
          details: 'fix anything ANYTHING!',
          userId: 2,
          houseId: 2,
          id: 65
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You cannot change a chore id.');
        })
        .catch(error => { throw error; });
    });
  });

  describe('PATCH /api/v1/houses/:houseId/bulletins/:id', () => {
    it('should be able to update a bulletin record', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/bulletins/1')
        .send({
          title: 'test-May C xzCcdsd Bulletin',
          body: 'test-May MaycZXcxz May',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a bulletin record if the record does not exist', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/bulletins/100')
        .send({
          title: 'test-May C xzCcdsd Bulletin',
          body: 'test-May MaycZXcxz May',
          houseId: 1
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.error.should.contain('Cannot find a bulletin with the id of');
        })
        .catch(error => { throw error; });
    });

    it('should not be able to update a bulletin record if the user is trying to change the id', () => {
      return chai.request(server)
        .patch('/api/v1/houses/1/bulletins/1')
        .send({
          title: 'test-May C xzCcdsd Bulletin',
          body: 'test-May MaycZXcxz May',
          houseId: 1,
          id: 10
        })
        .then(response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('You cannot change a bulletin id.');
        })
        .catch(error => { throw error; });
    });
  });

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

  describe('DELETE /api/v1/houses/:houseId/chores/:id', () => {
    it('should delete chore with id specified', () => {
      return chai.request(server)
        .del('/api/v1/houses/2/chores/2')
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should return 422 if no chore found', () => {
      return chai.request(server)
        .del('/api/v1/houses/2/chores/9898')
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`Could not find a chore with an id of 9898.`);
        })
        .catch(error => { throw error; });
    });
  });

  describe('DELETE /api/v1/houses/:houseId/bulletins/:id', () => {
    it('should delete bulletin with id specified', () => {
      return chai.request(server)
        .del('/api/v1/houses/2/bulletins/2')
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => { throw error; });
    });

    it('should return 422 if no bulletin found', () => {
      return chai.request(server)
        .del('/api/v1/houses/2/bulletins/9898')
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(`Could not find a bulletin with an id of 9898.`);
        })
        .catch(error => { throw error; });
    });
  });
});
