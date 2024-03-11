import Fastify from "fastify";
const fastify = Fastify({
	logger: true
});

import Supabase from "./Supabase";
const url = process.env.VITE_SUPABASE_URL || "";
const key = process.env.VITE_SUPABASE_KEY || "";
const supabase = new Supabase(url, key);

import Translate from "./translate";
const translate = new Translate();

import CharacterAI from "./CharacterAI";
const characterAI = new CharacterAI();

interface IBody {
	content: string;
	username: string;
	language?: string
}

interface IParams {
	characterId: string
}

interface IHeaders {
	"Authorization": string
}

interface IReply {
	200: { text: string };
	401: { error: string };
}

fastify.route<{
	Body: IBody,
	Params: IParams,
	Headers: IHeaders,
	Reply: IReply
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
	preHandler: async (request, reply, done) => {
		const { authorization } = request.headers;

		if (authorization) {
			if (await supabase.validateToken(authorization))
				return done();

			return reply.code(401).send({ error: "Authorization failed" });
		};
		return reply.code(401).send({ error: "Authorization required" });
	},
	handler: async (request, reply) => {
		const { characterId } = request.params;
		const { content, username, language } = request.body;

		const userInput = await translate.en(content);

		const rawText = await characterAI.sendAndAwaitResponse(
			`(OCC: This message was sent by ${username} - context is that multiple people are using you to in a chatroom): ${userInput}`,
			characterId
		);

		const text = await translate.locale(rawText, language);

		return reply.code(200).send({ text });
	}
});

export default fastify;