import fastify from './fastify';

import { config } from "dotenv";
config();

const PORT = Number(process.env.PORT) || 3000;

(() => {
	try {
		fastify.listen({ port: PORT });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	};
})();