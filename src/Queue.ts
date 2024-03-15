interface Task {
	characterId: string;
	content: string;
	username: string;
	language?: string;
};

class Queue {
	private queue: Array<Task> = [];
	private isRunning: boolean = false;
	private callback: (task: Task) => Promise<string>;

	constructor(callback: (task: Task) => Promise<string>) {
		this.callback = callback;
	};

	add2queue(task: Task): void {
		this.queue.push(task);
	};

	async next(): Promise<any> {
		if (this.queue.length >= 1 && !this.isRunning) {
			this.isRunning = true;
			const response = await this.callback(this.queue[0]);
			this.remove();
			return response;
		} else {
			this.isRunning = false;
		};
	};

	remove() {
		this.queue.shift();
		this.next();
	};
};

const queue = new Queue(async (task) => {
	return await new Promise((resolve) => {
		setTimeout(() => {
			resolve(task.content);
		}, 2000);
	});
});

export { Task };
export default Queue;