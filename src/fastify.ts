import Fastify from "fastify";
const fastify = Fastify({
	keepAliveTimeout: 600000,
	// logger: true
});

import Supabase from "./Supabase";
const supabase = new Supabase();

import Translate from "./Translate";
const translate = new Translate();

import CharacterAI from "./CharacterAI";
const characterAI = new CharacterAI();

import Queue from "./Queue";
const queue = new Queue(async (task) => {
	const userInput = await translate.en(task.content);

	const rawText = await characterAI.sendAndAwaitResponse(
		`(OCC: This message was sent by ${task.username} - context is that multiple people are using you to in a chatroom): ${userInput}`,
		task.characterId
	);

	const text = await translate.locale(rawText, task.language);

	return text;
});

fastify.route({
	method: 'GET',
	url: '/',
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					status: { type: 'string' }
				}
			}
		}
	},
	handler: async (_request, reply) => {
		reply.code(200).send({ status: "CAI-Server is running!" });
	}
});

fastify.route<{
	Body: {
		content: string;
		username: string;
		language?: string
	},
	Params: {
		characterId: string
	},
	Headers: {
		"Authorization": string
	},
	Reply: {
		200: { text: string };
		401: { error: string };
	}
}>({
	method: 'POST',
	url: '/:characterId',
	schema: {
		headers: {
			"Authorization": { type: 'string' }
		},
		body: {
			type: 'object',
			required: [ 'content', 'username' ],
			properties: {
				content: { type: 'string' },
				username: { type: 'string' },
				language: { type: 'string' }
			}
		},
		response: {
			200: {
				type: 'object',
				properties: {
					text: { type: 'string' }
				}
			},
			401: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			}
		}
	},
	preHandler: async (request, reply, _done) => {
		const { authorization } = request.headers;

		if (authorization) {
			if (await supabase.validateToken(authorization))
				return;

			return reply.code(401).send({ error: "Authorization failed" });
		};
		return reply.code(401).send({ error: "Authorization required" });
	},
	handler: async (request, reply) => {
		const { characterId } = request.params;
		const { content, username, language } = request.body;

		queue.add2queue({ characterId, content, username, language });
		const text = await queue.next();

		return reply.code(200).send({ text });
	}
});

export default fastify;