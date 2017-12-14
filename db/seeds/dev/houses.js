const housesData = require('../../../data/houses');
const usersData = require('../../../data/users');
const billsData = require('../../../data/bills');
const choresData = require('../../../data/chores');
const bulletinsData = require('../../../data/bulletins');

const createUser = (knex, user, house) => {
  return knex('houses').where('name', house).first()
    .then(houseRecord => {
      return knex('users').insert({
        name: user.name,
        houseId: houseRecord.id
      });
    });
};

const createBill = (knex, bill, house) => {
  return knex('houses').where('name', house).first()
    .then(houseRecord => {
      return knex('bills').insert({
        name: bill.name,
        total: bill.total,
        dueDate: bill.dueDate,
        houseId: houseRecord.id
      });
    });
};

const createBulletin = (knex, bulletin, house) => {
  return knex('houses').where('name', house).first()
    .then(houseRecord => {
      return knex('bulletins').insert({
        title: bulletin.title,
        body: bulletin.body,
        houseId: houseRecord.id
      });
    });
};

const createChore = (knex, chore, house) => {
  return knex('houses').where('name', house).first()
    .then(houseRecord => {
      return knex('chores').insert({
        name: chore.name,
        details: chore.details,
        houseId: houseRecord.id
      });
    });
};

exports.seed = function(knex, Promise) {
  return knex('bulletins').del()
    .then( () => knex('chores').del() )
    .then( () => knex('bills').del() )
    .then( () => knex('users').del() )
    .then( () => knex('houses').del() )
    .then(() => {
      return knex('houses').insert(housesData);
    })
    .then(() => {
      let usersPromises = [];
      usersData.forEach((user) => {
        let house = user.house;
        usersPromises.push(createUser(knex, user, house));
      });

      return Promise.all(usersPromises);
    })
    .then(() => {
      let billsPromises = [];
      billsData.forEach((bill) => {
        let house = bill.house;
        billsPromises.push(createBill(knex, bill, house));
      });

      return Promise.all(billsPromises);
    })
    .then(() => {
      let bulletinsPromises = [];
      bulletinsData.forEach((bulletin) => {
        let house = bulletin.house;
        bulletinsPromises.push(createBulletin(knex, bulletin, house));
      });

      return Promise.all(bulletinsPromises);
    })
    .then(() => {
      let choresPromises = [];
      choresData.forEach((chore) => {
        let house = chore.house;
        choresPromises.push(createChore(knex, chore, house));
      });

      return Promise.all(choresPromises);
    })
    .then(() => console.log('Dev Seeding Complete!'))
    .catch(error => console.log({ error }));
};
