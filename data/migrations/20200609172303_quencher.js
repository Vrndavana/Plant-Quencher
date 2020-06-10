exports.up = function(knex) {
    return knex.schema
  
      // Users Table
      .createTable("users", tbl => {
        tbl.increments();
        tbl
          .string("username", 255)
          .notNullable()
          .unique();
        tbl
          .string("password", 255)
          .notNullable();
      })
  
      // User Details Table
      .createTable("user_details", tbl => {
        tbl.increments();
        tbl
          .string('username', 255)
          .notNullable();
        tbl
          .string('phone', 255)
          .notNullable();
        tbl
          .string('email', 255)
          .notNullable();
        tbl
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
  
      // Plants Table
      .createTable("plants", tbl => {
        tbl.increments();
        tbl
          .string('name', 255)
          .notNullable()
          .unique();
        tbl
          .string('frequency', 255)
          .notNullable();
      })
  
      // User Plants Join Table
      .createTable("user_plants", tbl => {
        tbl.increments();
        tbl
          .string('nickname', 255)
          .notNullable()
          .defaultTo('');
        tbl
          .string('notes', 510)
          .notNullable()
          .defaultTo('');
        tbl
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        tbl
          .integer('plant_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('plants')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("users")
      .dropTableIfExists("user_details")
      .dropTableIfExists("plants")
      .dropTableIfExists("user_plants");
  };
