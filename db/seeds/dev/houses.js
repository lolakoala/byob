const housesData = require('../../../data/houses');
const usersData = require('../../../data/users');
const billsData = require('../../../data/bills');
const choresData = require('../../../data/chores');
const bulletinsData = require('../../../data/bulletins');

const createUser = (knex, user, house) => {
  return knex('houses').where('name', house).first()
    .then(houseRecord => {
      console.log(user, houseRecord.id);
      return knex('users').insert({
        name: user.name,
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
        usersPromises.push(createItem(knex, user, house, 'users'));
      });

      return Promise.all(usersPromises);
    })
    .then(() => {
      let billsPromises = [];
      billsData.forEach((bill) => {
        let house = bill.house;
        billsPromises.push(createItem(knex, bill, house, 'bills'));
      });

      return Promise.all(billsPromises);
    })
    .then(() => {
      let bulletinsPromises = [];
      bulletinsData.forEach((bulletin) => {
        let house = bulletin.house;
        bulletinsPromises.push(createItem(knex, bulletin, house, 'bulletins'));
      });

      return Promise.all(bulletinsPromises);
    })
    .then(() => {
      let choresPromises = [];
      choresData.forEach((chore) => {
        let house = chore.house;
        choresPromises.push(createItem(knex, chore, house, 'chores'));
      });

      return Promise.all(choresPromises);
    })
    .then(() => console.log('Dev Seeding Complete!'))
    .catch(error => console.log({ error }));
  // ]);//closes Promise.all//
};
//     .catch(error => console.log({ error }));
// };
