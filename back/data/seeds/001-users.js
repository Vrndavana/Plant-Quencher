const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('pass', 14);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'User'   , password: password},
        {username: 'Test'   , password: password},
        {username: 'Lotiz', password: password}
      ]);
    });
  };