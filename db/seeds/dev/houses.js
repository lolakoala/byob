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
    // .then(response => console.log(response));
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
    .then()
    .then(() => console.log('Dev Seeding Complete!'))
    .catch(error => console.log({ error }));
  // ]);//closes Promise.all//
};
//     .catch(error => console.log({ error }));
// };
