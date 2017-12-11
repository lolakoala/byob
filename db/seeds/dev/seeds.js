exports.seeds = function (knex, Promise) {
  return knex('bulletins').del()
    .then(() => knex('chores')).del()
    .then(() => knex('bills')).del()
    .then(() => knex('users')).del()
    .then(() => knex('houses')).del()
    .then(() => {
      return Promise.all([
        knex('houses').insert([
          { name: 'DogHouse', secretKey: 'oiuhasrfou'},
          { name: 'CatHouse', secretKey: '234tewrf'},
          { name: 'BirdHouse', secretKey: '098ht4t'},
          { name: 'BugHouse', secretKey: '09q58ugronfs'},
          { name: 'MouseHouse', secretKey: '0483utrfjenfv'},
          { name: 'SnakeHouse', secretKey: '34518234j'},
          { name: 'FrogHouse', secretKey: 'oiajfoiuw'},
          { name: 'SheepHouse', secretKey: '08935jneg'}
        ])
          .then(() => {
            return knex('users').insert([
              { name: 'Lola', houseId: 1 },
              { name: 'Nik', houseId: 1 },
              { name: 'Rufus', houseId: 1 },
              { name: 'Adam', houseId: 1 },
              { name: 'Alex', houseId: 1 },
              { name: 'Amy', houseId: 2 },
              { name: 'Francy', houseId: 2 },
              { name: 'Robbie', houseId: 2 },
              { name: 'Brittany', houseId: 2 },
              { name: 'Hector', houseId: 3 },
              { name: 'Luke', houseId: 3 },
              { name: 'Rufus', houseId: 3 },
              { name: 'Jenn', houseId: 3 },
              { name: 'Rhonda', houseId: 3 },
              { name: 'Melissa', houseId: 4 },
              { name: 'Kayla', houseId: 4 },
              { name: 'Laurel', houseId: 4 },
              { name: 'Schweetz', houseId: 5 },
              { name: 'Ralphie', houseId: 5 },
              { name: 'Porter', houseId: 5 },
              { name: 'Bandit', houseId: 5 },
              { name: 'Fendie', houseId: 5 },
              { name: 'Julie', houseId: 6 },
              { name: 'Leta', houseId: 6 },
              { name: 'Nate', houseId: 6 },
              { name: 'Jhun', houseId: 7 },
              { name: 'Christy', houseId: 7 },
              { name: 'Louisa', houseId: 7 },
              { name: 'Will', houseId: 7 },
              { name: 'Pam', houseId: 7 },
              { name: 'Mike', houseId: 8 },
              { name: 'Brenna', houseId: 8 },
              { name: 'Meeka', houseId: 8 },
              { name: 'Beyonce', houseId: 8 }
            ]);
          })
          .then(() => {
            return knex('bills').insert([
              //bills seed data goes here
            ]);
          })
          .then(() => {
            return knex('chores').insert([
              //chores seed data goes here
            ]);
          })
          .then(() => {
            return knex('bulletins').insert([
              //bulletins seed data goes here
            ]);
          })
          .then(() => console.log('Dev Seeding Complete!'))
          .catch(error => console.log({ error }))
      ]);//closes Promise.all//
    })
    .catch(error => console.log({ error }));
};
