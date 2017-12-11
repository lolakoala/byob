export.seeds = function (knex, Promise) {
  return knex('bulletins').del()
    .then(() => knex('chores')).del()
    .then(() => knex('bills')).del()
    .then(() => knex('users')).del()
    .then(() => knex('houses')).del()
    .then(() => {
      return Promise.all([
        knex('houses').insert([
          { name: 'test-DogHouse', secretKey: 'oiuhasrfou'},
          { name: 'test-CatHouse', secretKey: '234tewrf'},
          { name: 'test-BirdHouse', secretKey: '098ht4t'},
          { name: 'test-BugHouse', secretKey: '09q58ugronfs'},
          { name: 'test-MouseHouse', secretKey: '0483utrfjenfv'},
          { name: 'test-SnakeHouse', secretKey: '34518234j'},
          { name: 'test-FrogHouse', secretKey: 'oiajfoiuw'},
          { name: 'test-SheepHouse', secretKey: '08935jneg'}
        ])
        .then(() => {
          return knex('users').insert([
            { name: 'test-Lola', houseId: 1 },
            { name: 'test-Nik', houseId: 1 },
            { name: 'test-Rufus', houseId: 1 },
            { name: 'test-Adam', houseId: 1 },
            { name: 'test-Alex', houseId: 1 },
            { name: 'test-Amy', houseId: 2 },
            { name: 'test-Francy', houseId: 2 },
            { name: 'test-Robbie', houseId: 2 },
            { name: 'test-Brittany', houseId: 2 },
            { name: 'test-Hector', houseId: 3 },
            { name: 'test-Luke', houseId: 3 },
            { name: 'test-Rufus', houseId: 3 },
            { name: 'test-Jenn', houseId: 3 },
            { name: 'test-Rhonda', houseId: 3 },
            { name: 'test-Melissa', houseId: 4 },
            { name: 'test-Kayla', houseId: 4 },
            { name: 'test-Laurel', houseId: 4 },
            { name: 'test-Schweetz', houseId: 5 },
            { name: 'test-Ralphie', houseId: 5 },
            { name: 'test-Porter', houseId: 5 },
            { name: 'test-Bandit', houseId: 5 },
            { name: 'test-Fendie', houseId: 5 },
            { name: 'test-Julie', houseId: 6 },
            { name: 'test-Leta', houseId: 6 },
            { name: 'test-Nate', houseId: 6 },
            { name: 'test-Jhun', houseId: 7 },
            { name: 'test-Christy', houseId: 7 },
            { name: 'test-Louisa', houseId: 7 },
            { name: 'test-Will', houseId: 7 },
            { name: 'test-Pam', houseId: 7 },
            { name: 'test-Mike', houseId: 8 },
            { name: 'test-Brenna', houseId: 8 },
            { name: 'test-Meeka', houseId: 8 },
            { name: 'test-Beyonce', houseId: 8 }
          ])
        })
        .then(() => {
          return knex('bills').insert([
            //bills seed data goes here
          ])
        })
        .then(() => {
          return knex('chores').insert([
            //chores seed data goes here
          ])
        })
        .then(() => {
          return knex('bulletins').insert([
            //bulletins seed data goes here
          ])
        })
        .then(() => console.log('Test Seeding Complete!'))
        .catch(error => console.log({ error }))
      ])//closes Promise.all//
    })
    .catch(error => console.log({ error }))
}
