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
              {
                name: 'electricity',
                total: '101.23',
                dueDate: '12/31/17',
                houseId: 1
              },
              {
                name: 'water',
                total: '99.67',
                dueDate: '12/30/17',
                houseId: 2
              },
              {
                name: 'trash',
                total: '99.67',
                dueDate: '12/30/17',
                houseId: 3
              },
              {
                name: 'cable',
                total: '89.74',
                dueDate: '12/20/17',
                houseId: 4
              },
              {
                name: 'internet',
                total: '50.03',
                dueDate: '12/28/17',
                houseId: 5
              },
              {
                name: 'pool',
                total: '30.00',
                dueDate: '12/15/17',
                houseId: 6
              },
              {
                name: 'lawn care',
                total: '50.00',
                dueDate: '12/15/17',
                houseId: 7
              },
              {
                name: 'gas',
                total: '72.99',
                dueDate: '12/14/17',
                houseId: 8
              }
            ]);
          })
          .then(() => {
            return knex('chores').insert([
              {
                name: 'sweep the front deck',
                details: 'get this done today!',
                userId: 1,
                houseId: 1
              },
              {
                name: 'sweep the back deck',
                details: 'get this done tomorrow!',
                userId: 2,
                houseId: 2
              },
              {
                name: 'sweep the stairs',
                details: 'get this done now!',
                userId: 3,
                houseId: 3
              },
              {
                name: 'take out the front trash',
                details: 'it smells horrible!',
                userId: 4,
                houseId: 4
              },
              {
                name: 'take out the back trash',
                details: 'it smells horrible!',
                userId: 5,
                houseId: 5
              },
              {
                name: 'take out the kitchen trash',
                details: 'it is full!',
                userId: 6,
                houseId: 6
              },
              {
                name: 'take out the bathroom trash',
                details: 'it is full!',
                userId: 7,
                houseId: 7
              },
              {
                name: 'take out the bedroom trash',
                details: 'it is full!',
                userId: 8,
                houseId: 8
              },
              {
                name: 'clean the entryway',
                details: 'it is a mess!',
                userId: 9,
                houseId: 1
              },
              {
                name: 'clean the office',
                details: 'it is a mess!',
                userId: 10,
                houseId: 2
              },
              {
                name: 'clean the front bedroom',
                details: 'it is a mess!',
                userId: 11,
                houseId: 3
              },
              {
                name: 'clean the side bedroom',
                details: 'it is a mess!',
                userId: 12,
                houseId: 4
              },
              {
                name: 'clean the back bedroom',
                details: 'it is a mess!',
                userId: 13,
                houseId: 5
              },
              {
                name: 'clean the guest bedroom',
                details: 'it is a mess!',
                userId: 14,
                houseId: 6
              },
              {
                name: 'clean the master bedroom',
                details: 'it is a mess!',
                userId: 15,
                houseId: 7
              },
              {
                name: 'clean the front bathroom',
                details: 'it is a mess!',
                userId: 16,
                houseId: 8
              },
              {
                name: 'clean the side bathroom',
                details: 'it is a mess!',
                userId: 17,
                houseId: 1
              },
              {
                name: 'clean the back bathroom',
                details: 'it is a mess!',
                userId: 18,
                houseId: 2
              },
              {
                name: 'clean the guest bathroom',
                details: 'it is a mess!',
                userId: 19,
                houseId: 3
              },
              {
                name: 'clean the master bathroom',
                details: 'it is a mess!',
                userId: 20,
                houseId: 4
              },
              {
                name: 'clean the upstairs bathroom',
                details: 'it is a mess!',
                userId: 21,
                houseId: 5
              },
              {
                name: 'clean the upstairs bedroom',
                details: 'it is a mess!',
                userId: 22,
                houseId: 6
              },
              {
                name: 'clean the gutters',
                details: 'they need it!',
                userId: 23,
                houseId: 7
              },
              {
                name: 'paint the house',
                details: 'it is pretty ugly',
                userId: 24,
                houseId: 8
              },
              {
                name: 'paint the garage',
                details: 'it is pretty ugly',
                userId: 25,
                houseId: 1
              },
              {
                name: 'paint the mailbox',
                details: 'it is pretty ugly',
                userId: 26,
                houseId: 2
              },
              {
                name: 'fix the mailbox',
                details: 'before the mailman comes!',
                userId: 27,
                houseId: 3
              },
              {
                name: 'dust the furniture',
                details: 'in the living room',
                userId: 28,
                houseId: 4
              },
              {
                name: 'dust the furniture',
                details: 'in the office',
                userId: 29,
                houseId: 5
              },
              {
                name: 'dust the furniture',
                details: 'in the parlor',
                userId: 30,
                houseId: 6
              },
              {
                name: 'empty the dishwasher',
                details: 'it is VERY full!',
                userId: 31,
                houseId: 7
              }
            ]);
          })
          .then(() => {
            return knex('bulletins').insert([
              {
                title: 'May Bulletin',
                body: 'May May May',
                houseId: 1
              },
              {
                title: 'June Bulletin',
                body: 'June June June',
                houseId: 2
              },
              {
                title: 'July Bulletin',
                body: 'July July July',
                houseId: 3
              },
              {
                title: 'August Bulletin',
                body: 'August August August',
                houseId: 4
              }
            ]);
          })
          .then(() => console.log('Dev Seeding Complete!'))
          .catch(error => console.log({ error }))
      ]);//closes Promise.all//
    })
    .catch(error => console.log({ error }));
};
