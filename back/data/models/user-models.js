const db = require( '../db-config' );
//===============================================================>
// Exports
//=====================>
module.exports = {
  addUser,
  addPlant,
  addDetails,
  findBy,
  findByID,
  findDetails,
  findPlants,
  updateUser,
  updateDetails,
  removeUser,
  removePlant,
  removeDetails,
};
//===============================================================>
// Adds
//=====================> Add User
async function addUser( user ) {
  const [ id ] = await db( 'users' )
    .insert( user, 'id' );
  return findByID( id );
}
//=====================> Add Plant to User
async function addPlant( id, plant ) {
  const [ user_id ] = await db( 'user_plants' )
    .insert( plant, 'id' );
  return findPlants( id );
}
//=====================> Add Details
async function addDetails( details ) {
  const [ details_id ] = await db( 'user_details' )
    .insert( details, 'id' );
  return db( 'user_details' )
    .select( 'user_id'
      , 'id as details_id'
      , 'username as user_name'
      , 'phone as user_phone'
      , 'email as user_email')
    .where( 'id', details_id )
    .first();
}
//===============================================================>
// Finds
//=====================> Find By
function findBy( filter ) {
  return db( 'users' )
    .where ( filter  );
}
//=====================> Find By Id
function findByID( id ) {
  return db( 'users' )
    .select( 'id', 'username' )
    .where ( { id }  )
    .first();
}
//=====================> Find Details
function findDetails( id ) {
  return db( 'user_details as ud' )
    .select( 'ud.user_id as user_id'
      , 'ud.username as user_name'
      , 'ud.phone as user_phone'
      , 'ud.email as user_email' )
    .where( 'ud.user_id', id )
    .first();
}
//=====================> Find Plants
function findPlants( id ) {
  return db( 'user_plants as up' )
    .innerJoin( 'plants as p', 'up.plant_id', 'p.id' )
    .select( 'up.user_id as user_id'
      , 'p.id as plant_id'
      , 'p.name as plant_name'
      , 'up.nickname'
      , 'up.notes'
      , 'p.frequency as watering_frequency' )
    .where( 'up.user_id', id )
}
//===============================================================>
// Updates
//=====================> Update User
function updateUser( id, changes ) {
  return db( 'users' )
    .where ( { id }  )
    .update( changes )
    .then( () => findByID( id ) );
}
//=====================> Update Details
function updateDetails( id, changes ) {
  return db( 'user_details' )
    .where ( 'user_id', id  )
    .update( changes )
    .then( () => 
      db( 'user_details as ud' )
        .select( 'ud.user_id'
          , 'ud.id as details_id'
          , 'ud.username as user_name'
          , 'ud.phone as user_phone'
          , 'ud.email as user_email')
        .where( 'ud.user_id', id )
        .first()
    );
}
//===============================================================>
// Removes
//=====================> Remove User
function removeUser( id ) {
  return db( 'users' )
    .where( 'id', id )
    .first()
    .then( user => {
      return user ?
        db( 'users' )
          .where( { id } )
          .del()
          .then( () => user )
        : null;
    } );
}
//=====================> Remove Plant
function removePlant( id ) {
  return db( 'user_plants' )
    .where( 'plant_id', id )
    .first()
    .then( plant => {
      return plant ?
        db( 'user_plants' )
          .where( 'plant_id', id )
          .del()
          .then( () => plant )
        : null;
    } );
}
//=====================> Remove Details
function removeDetails( id ) {
  return db( 'user_details' )
    .where( 'user_id', id )
    .first()
    .then( details => {
      return details ?
        db( 'user_details' )
          .where( 'user_id', id )
          .del()
          .then( () => details )
        : null;
    } );
}