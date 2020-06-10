const db = require( '../db-config' );
//===============================================================>
// Exports
//=====================>
module.exports = {
  addPlant,
  find,
  findBy,
  findByID,
  updatePlant,
}
//===============================================================>
// Finds
//=====================> Find All
function find() {
  return db( 'plants' )
}
//=====================> Find By
function findBy( filter ) {
  return db( 'plants' )
    .where ( filter  );
}
//=====================> Find By Id
function findByID( id ) {
  return db( 'plants' )
    .where ( { id }  )
    .first();
}
//===============================================================>
// Adds
//=====================> Add Plant
async function addPlant( plant ) {
  const [ id ] = await db( 'plants' )
    .insert( plant, 'id' );
  return findByID( id );
}
//===============================================================>
// Updates
//=====================> Update Plant
function updatePlant( id, changes ) {
  return db( 'plants' )
    .where ( { id }  )
    .update( changes )
    .then( () => findByID( id ) );
}