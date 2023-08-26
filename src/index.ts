import Express from 'express';
const client = Express();

client.use(Express.json());

import router from './router';
client.use(router);

const { PORT } = process.env;
client.listen(Number(PORT), () => { console.log(`Listening on port ${PORT}`) });