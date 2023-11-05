# CAI-Server

API Сервер Character.AI со встроенным переводчиком!!!

Создайте `.env` файл со следующими полями:
```properties
PORT = "" # Порт для CAI сервера
TOKEN = "" # Токен с сайта (access_token)
CHARID = "" # ID персонажа с сайта
```

Соберите проект и просто запустите сервер:
```cmd
npx tsc
npm start
```

# API для общения

Используйте `http://localhost:{PORT}/` и радуйтесь жизни :blush:

Для запросов необходимыми являются только 2 поля: `content` и `username`.  
Поле `language` опционально. (По умолчанию язык вывода `en`)

`language` формата: `ISO 639-1`

### Пример №1
```js
async function ChatAI() {
	const response = await fetch(
		'http://localhost:8080/',
		{
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				content: "Как дела?",
				username: "POTI",
				language: 'ru'
			}
		)
	});
	
	return response.json();
}
```

### Пример №2
```js
async function ChatAI() {
	const response = await fetch(
		'http://localhost:8000/',
		{
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				content: "How are you?",
				username: "POTI"
			}
		)
	});
	
	return response.json();
}
```

### Ответ формата:
```json
{
	"text": "Some generated string"
}
```