
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
      table.string('Name');
      table.string('')
      table.integer('houseId').unsigned();
      table.foreign('houseId').references('houses.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {

};



exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('palettes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('color1');
      table.string('color2');
      table.string('color3');
      table.string('color4');
      table.string('color5');
      table.integer('projectId').unsigned();
      table.foreign('projectId').references('projects.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects')
  ]);
};
