import { Router } from 'express';
import CharacterAI from './CharacterAI';
import Translate from './translate';

const router = Router();
const translate = new Translate();
const characterAI = new CharacterAI();

router.get('/', async (req, res) => {
	const { content, language, username } = req.body;

	if (content === undefined || username === undefined) {
		res.status(400).send({ error: `Required fields 'content' & 'username` });
	} else {
		const userInput = await translate.en(content);

		const rawText = await characterAI.sendAndAwaitResponse(
			`(OCC: This message was sent by ${username} - context is that multiple people are using you to in a chatroom): ${userInput}`
		);

		const text = await translate.locale(rawText, language);
		
		res.send({ text });
	};
});

export default router;