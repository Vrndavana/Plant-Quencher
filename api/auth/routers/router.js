const router         = require( 'express' ).Router();
const authRouter     = require( './auth-router'      );
const userRouter     = require( './user-router'      );
const plantsRouter   = require( './plants-router'    );
const authMiddleWare = require( '../auth-middleware' );
//===============================================================>
// Use
//=====================>
router.use( '/auth',   authRouter                   );
router.use( '/users',  authMiddleWare, userRouter   );
router.use( '/plants', plantsRouter                 );
//===============================================================>
// Router working message
//=====================>
router.get( '/', ( req, res ) =>  {
  res.json( { ServerSays: "All your https are belong to us" } );
} );
//===============================================================>

module.exports = router;
//===============================================================> EOF