// @ts-ignore
import CAI from 'node_characterai';

class CharacterAI {
	private client: CAI;
	private TOKEN = process.env.TOKEN || "";
	private CHARACTER = process.env.CHARID || "";

	constructor() {
		this.client = new CAI();
		this.authenticate();
	};

	public async sendAndAwaitResponse(input: string): Promise<string> {
		if (!this.isAuthenticated()) this.authenticate();

		const chat = await this.client.createOrContinueChat(this.CHARACTER);
		const response = await chat.sendAndAwaitResponse(input, true);
		return response.text;
	};

	private authenticate(): void {
		if (this.TOKEN) {
			this.authenticateWithToken();
		} else {
			this.authenticateAsGuest();
		};
	};

	private isAuthenticated(): boolean {
		return this.client.isAuthenticated();
	};

	private authenticateWithToken(): void {
		this.client.authenticateWithToken(this.TOKEN);
	};

	private authenticateAsGuest(): void {
		this.client.authenticateAsGuest();
	};
};

export default CharacterAI;