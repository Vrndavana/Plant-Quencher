
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {name: 'Roses', frequency: 'Once every 24 hours'},
        {name: 'Sunflowers', frequency: 'Once every 12 hours'},
        {name: 'Tulips', frequency: 'Twice a week'}
      ]);
    });
};
