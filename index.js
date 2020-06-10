const server = require('./api/server.js'); // <- DID YOU MAKE SERVER.JS YET?
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));