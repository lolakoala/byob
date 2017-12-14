exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('houses', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('secretKey');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('houseId').unsigned();
      table.foreign('houseId').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('bills', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('total');
      table.string('dueDate');
      table.integer('houseId').unsigned();
      table.foreign('houseId').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('chores', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('details');
      table.integer('houseId').unsigned();
      table.foreign('houseId').references('houses.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('bulletins', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('body');
      table.integer('houseId').unsigned();
      table.foreign('houseId').references('houses.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bulletins'),
    knex.schema.dropTable('chores'),
    knex.schema.dropTable('bills'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('houses')
  ]);
};
