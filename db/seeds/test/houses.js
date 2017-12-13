
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bulletins').del()
    .then( () => knex('chores').del() )
    .then( () => knex('bills').del() )
    .then( () => knex('users').del() )
    .then( () => knex('houses').del() )
    .then( () => {
      return Promise.all([
        knex('houses').insert([
          { id: 1, name: 'test-DogHouse', secretKey: 'oiuhasrfou'},
          { id: 2, name: 'test-CatHouse', secretKey: '234tewrf'},
          { id: 3, name: 'test-BirdHouse', secretKey: '098ht4t'},
          { id: 4, name: 'test-BugHouse', secretKey: '09q58ugronfs'},
          { id: 5, name: 'test-MouseHouse', secretKey: '0483utrfjenfv'},
          { id: 6, name: 'test-SnakeHouse', secretKey: '34518234j'},
          { id: 7, name: 'test-FrogHouse', secretKey: 'oiajfoiuw'},
          { id: 8, name: 'test-SheepHouse', secretKey: '08935jneg'}
        ])
          .then(() => {
            return knex('users').insert([
              { id: 1, name: 'test-Lola', houseId: 1 },
              { id: 2, name: 'test-Nik', houseId: 1 },
              { id: 3, name: 'test-Rufus', houseId: 1 },
              { id: 4, name: 'test-Adam', houseId: 1 },
              { id: 5, name: 'test-Alex', houseId: 1 },
              { id: 6, name: 'test-Amy', houseId: 2 },
              { id: 7, name: 'test-Francy', houseId: 2 },
              { id: 8, name: 'test-Robbie', houseId: 2 },
              { id: 9, name: 'test-Brittany', houseId: 2 },
              { id: 10, name: 'test-Hector', houseId: 3 },
              { id: 11, name: 'test-Luke', houseId: 3 },
              { id: 12, name: 'test-Rufus', houseId: 3 },
              { id: 13, name: 'test-Jenn', houseId: 3 },
              { id: 14, name: 'test-Rhonda', houseId: 3 },
              { id: 15, name: 'test-Melissa', houseId: 4 },
              { id: 16, name: 'test-Kayla', houseId: 4 },
              { id: 17, name: 'test-Laurel', houseId: 4 },
              { id: 18, name: 'test-Schweetz', houseId: 5 },
              { id: 19, name: 'test-Ralphie', houseId: 5 },
              { id: 20, name: 'test-Porter', houseId: 5 },
              { id: 21, name: 'test-Bandit', houseId: 5 },
              { id: 22, name: 'test-Fendie', houseId: 5 },
              { id: 23, name: 'test-Julie', houseId: 6 },
              { id: 24, name: 'test-Leta', houseId: 6 },
              { id: 25, name: 'test-Nate', houseId: 6 },
              { id: 26, name: 'test-Jhun', houseId: 7 },
              { id: 27, name: 'test-Christy', houseId: 7 },
              { id: 28, name: 'test-Louisa', houseId: 7 },
              { id: 29, name: 'test-Will', houseId: 7 },
              { id: 30, name: 'test-Pam', houseId: 7 },
              { id: 31, name: 'test-Mike', houseId: 8 },
              { id: 32, name: 'test-Brenna', houseId: 8 },
              { id: 33, name: 'test-Meeka', houseId: 8 },
              { id: 34, name: 'test-Beyonce', houseId: 8 }
            ]);
          })
          .then(() => {
            return knex('bills').insert([
              {
                name: 'test-electricity',
                total: '101.23',
                dueDate: '12/31/17',
                houseId: 1
              },
              {
                name: 'test-water',
                total: '99.67',
                dueDate: '12/30/17',
                houseId: 2
              },
              {
                name: 'test-trash',
                total: '99.67',
                dueDate: '12/30/17',
                houseId: 3
              },
              {
                name: 'test-cable',
                total: '89.74',
                dueDate: '12/20/17',
                houseId: 4
              },
              {
                name: 'test-internet',
                total: '50.03',
                dueDate: '12/28/17',
                houseId: 5
              },
              {
                name: 'test-pool',
                total: '30.00',
                dueDate: '12/15/17',
                houseId: 6
              },
              {
                name: 'test-lawn care',
                total: '50.00',
                dueDate: '12/15/17',
                houseId: 7
              },
              {
                name: 'test-gas',
                total: '72.99',
                dueDate: '12/14/17',
                houseId: 8
              }
            ]);
          })
          .then(() => {
            return knex('chores').insert([
              {
                name: 'test-sweep the front deck',
                details: 'test-get this done today!',
                userId: 1,
                houseId: 1
              },
              {
                name: 'test-sweep the back deck',
                details: 'test-get this done tomorrow!',
                userId: 2,
                houseId: 2
              },
              {
                name: 'test-sweep the stairs',
                details: 'test-get this done now!',
                userId: 3,
                houseId: 3
              },
              {
                name: 'test-take out the front trash',
                details: 'test-it smells horrible!',
                userId: 4,
                houseId: 4
              },
              {
                name: 'test-take out the back trash',
                details: 'test-it smells horrible!',
                userId: 5,
                houseId: 5
              },
              {
                name: 'test-take out the kitchen trash',
                details: 'test-it is full!',
                userId: 6,
                houseId: 6
              },
              {
                name: 'test-take out the bathroom trash',
                details: 'test-it is full!',
                userId: 7,
                houseId: 7
              },
              {
                name: 'test-take out the bedroom trash',
                details: 'test-it is full!',
                userId: 8,
                houseId: 8
              },
              {
                name: 'test-clean the entryway',
                details: 'test-it is a mess!',
                userId: 9,
                houseId: 1
              },
              {
                name: 'test-clean the office',
                details: 'test-it is a mess!',
                userId: 10,
                houseId: 2
              },
              {
                name: 'test-clean the front bedroom',
                details: 'test-it is a mess!',
                userId: 11,
                houseId: 3
              },
              {
                name: 'test-clean the side bedroom',
                details: 'test-it is a mess!',
                userId: 12,
                houseId: 4
              },
              {
                name: 'test-clean the back bedroom',
                details: 'test-it is a mess!',
                userId: 13,
                houseId: 5
              },
              {
                name: 'test-clean the guest bedroom',
                details: 'test-it is a mess!',
                userId: 14,
                houseId: 6
              },
              {
                name: 'test-clean the master bedroom',
                details: 'test-it is a mess!',
                userId: 15,
                houseId: 7
              },
              {
                name: 'test-lean the front bathroom',
                details: 'test-it is a mess!',
                userId: 16,
                houseId: 8
              },
              {
                name: 'test-clean the side bathroom',
                details: 'test-it is a mess!',
                userId: 17,
                houseId: 1
              },
              {
                name: 'test-clean the back bathroom',
                details: 'test-it is a mess!',
                userId: 18,
                houseId: 2
              },
              {
                name: 'test-clean the guest bathroom',
                details: 'test-it is a mess!',
                userId: 19,
                houseId: 3
              },
              {
                name: 'test-clean the master bathroom',
                details: 'test-it is a mess!',
                userId: 20,
                houseId: 4
              },
              {
                name: 'test-clean the upstairs bathroom',
                details: 'test-it is a mess!',
                userId: 21,
                houseId: 5
              },
              {
                name: 'test-clean the upstairs bedroom',
                details: 'test-it is a mess!',
                userId: 22,
                houseId: 6
              },
              {
                name: 'test-clean the gutters',
                details: 'test-they need it!',
                userId: 23,
                houseId: 7
              },
              {
                name: 'test-paint the house',
                details: 'test-it is pretty ugly',
                userId: 24,
                houseId: 8
              },
              {
                name: 'test-paint the garage',
                details: 'test-it is pretty ugly',
                userId: 25,
                houseId: 1
              },
              {
                name: 'test-paint the mailbox',
                details: 'test-it is pretty ugly',
                userId: 26,
                houseId: 2
              },
              {
                name: 'test-fix the mailbox',
                details: 'test-before the mailman comes!',
                userId: 27,
                houseId: 3
              },
              {
                name: 'test-dust the furniture',
                details: 'test-in the living room',
                userId: 28,
                houseId: 4
              },
              {
                name: 'test-dust the furniture',
                details: 'test-in the office',
                userId: 29,
                houseId: 5
              },
              {
                name: 'test-dust the furniture',
                details: 'test-in the parlor',
                userId: 30,
                houseId: 6
              }
            ]);
          })
          .then(() => {
            return knex('bulletins').insert([
              {
                title: 'test-May Bulletin',
                body: 'test-May May May',
                houseId: 1
              },
              {
                title: 'test-June Bulletin',
                body: 'test-June June June',
                houseId: 2
              },
              {
                title: 'test-July Bulletin',
                body: 'test-July July July',
                houseId: 3
              },
              {
                title: 'test-August Bulletin',
                body: 'test-August August August',
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
