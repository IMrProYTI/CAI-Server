import fastify from './fastify';

import { config } from "dotenv";
config();

const PORT = Number(process.env.PORT) || 8080;

(() => {
	try {
		fastify.listen({ port: PORT, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	};
})();