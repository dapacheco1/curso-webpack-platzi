//work with OS filesystem
const fs = require('fs');

//crear archivo .env y la variable
fs.writeFileSync('./.env',`API=${process.env.API}\n`);

