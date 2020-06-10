const router     = require( 'express' ).Router();
const Users      = require( '../../../data/models/user-models' );

//===============================================================>
// GET requests
//=====================> Testing /users endpoint

router.get( '/test', ( req, res ) =>  {
  res.json( { ServerSays: "All your https are belong to us from /api/users" } );
} );

//=====================> Retrieving a user with ID req.params.id

router.get( '/', ( req, res ) =>  {
  const { id } = req.token;

  Users.findDetails( id ) 
    .then( user => {
      res.status( 200 ).json( user );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) );
} );

//=====================> Retrieving a user's plants with ID req.params.id

router.get( '/plants', ( req, res ) =>  {
  const { id } = req.token;

  Users.findPlants( id ) 
    .then( plants => {
      res.status( 200 ).json( plants );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) );
} );

//===============================================================>
// POST requests
//=====================> Posting a plant to a user

router.post( '/plants', ( req, res ) => {
  const { id } = req.token;
  const plant = { user_id: id, plant_id: req.body.plant_id }

  Users.addPlant( id, plant )
    .then( plants => {
      res.status( 201 ).json( plants );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

//===============================================================>
// PUT requests
//=====================> Update User

router.put( '/', ( req, res ) => {
  const { id } = req.token;
  Users.updateUser( id, req.body )
    .then( user => {
      res.status( 201 ).json( user );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

//=====================> Update User Details

router.put( '/details', ( req, res ) => {
  const { id } = req.token;
  Users.updateDetails( id, req.body )
    .then( details => {
      res.status( 201 ).json( details );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

//===============================================================>
// DELETE requests
//=====================>

router.delete( '/plants/:id', ( req, res ) => {
  Users.removePlant( req.params.id )
    .then( plant => {
      res.status( 200 ).json( plant );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

router.delete( '/', ( req, res ) => {
  const { id } = req.token;
  Users.removeUser( id )
    .then( user => {
      res.status( 200 ).json( user );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

module.exports = router;