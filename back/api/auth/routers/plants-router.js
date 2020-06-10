const router = require( 'express' ).Router();
const Plants = require( '../../../data/models/plants-models' );

//===============================================================>
// GET requests
//=====================> Testing /plants endpoint

router.get( '/test', ( req, res ) =>  {
  res.json( { ServerSays: "All your https are belong to us from /api/plants" } );
} );

//=====================> Retrieve All Plants

router.get( '/', ( req, res ) =>  {
  Plants.find() 
    .then( plants => {
      res.status( 200 ).json( plants );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) );
} );

//=====================> Retrieve Specific Plant

router.get( '/:id', ( req, res ) =>  {
  const { id } = req.params;

  Plants.findByID( id ) 
    .then( plant => {
      res.status( 200 ).json( plant );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) );
} );

//===============================================================>
// POST requests
//=====================> Posting a plant to plants database

router.post( '/', ( req, res ) => {
  const plant = req.body;

  Plants.addPlant( plant )
    .then( plant => {
      res.status( 201 ).json( plant );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

//===============================================================>
// PUT requests
//=====================> Update a Plant

router.put( '/:id', ( req, res ) => {
  const { id } = req.params;

  Plants.updatePlant( id, req.body )
    .then( plant => {
      res.status( 201 ).json( plant );
    } )
    .catch( error => res.status( 500 ).json( { message: "Server Error" } ) )
} )

module.exports = router;