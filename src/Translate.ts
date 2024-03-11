import translate from "@iamtraction/google-translate";

class Translate {
	private regex: RegExp = new RegExp(`^[\d\w\s\r~@#$^&*()\-_+=[\]{}|\\,.!?:<>'"\/;\` %]{1,}$`);

	constructor() {};

	public async en(input: string): Promise<string> {
		if (this.regex.test(input)) {
			return input;
		} else {
			const response = await translate(input, { to: 'en' });
			return response.text;
		};
	};

	public async locale(input: string, language?: string): Promise<string> {
		if (language) {
			const lang = this.Discord2ISO639(language);
			if (lang !== 'en') {
				const responce = await translate(input, { from: 'en', to: lang });
				return responce.text;
			} else {
				return input
			};
		} else {
			return input;
		};
	};

	private Discord2ISO639(language: string): string {
		switch (language) {
			case 'en-GB': return 'en';
			case 'en-US': return 'en';
			case 'es-ES': return 'es';
			case 'pt-BR': return 'pt';
			case 'sv-SE': return 'sv';
			case 'zh-CN': return 'zh';
			case 'zh-TW': return 'zh';
		
			default: return language;
		};
	};
};

export default Translate;