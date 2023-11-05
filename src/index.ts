import Express from 'express';
const client = Express();

import { config } from 'dotenv';
config();

client.use(Express.json());

import router from './router';
client.use(router);

const { PORT } = process.env;
client.listen(Number(PORT), () => { console.log(`Listening on port ${PORT}`) });