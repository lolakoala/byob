export.seeds = function (knex, Promise) {
  return knex('bulletins').del()
    .then(() => knex('choirs')).del()
    .then(() => knex('bills')).del()
    .then(() => knex('users')).del()
    .then(() => knex('houses')).del()
    .then(() => {
      return Promise.all([
        knex('houses').insert([
          //houses seed data goes here
        ])
        .then(() => {
          return knex('users').insert([
            //bulletins seed data goes here
          ])
        })
        .then(() => {
          return knex('bills').insert([
            //bills seed data goes here
          ])
        })
        .then(() => {
          return knex('choirs').insert([
            //choirs seed data goes here
          ])
        })
        .then(() => {
          return knex('bulletins').insert([
            //bulletins seed data goes here
          ])
        })
        .then(() => console.log('Dev Seeding Complete!'))
        .catch(error => console.log({ error }))
      ])//closes Promise.all//
    })
    .catch(error => console.log({ error }))
}