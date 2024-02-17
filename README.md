# CAI-Server

API Сервер Character.AI со встроенным переводчиком!!!

Создайте `.env` файл в корневой папке со следующими полями:
```properties
PORT = "" # Порт для CAI сервера
AUTH = "" # Строка которая необходима для авторизации на сервере.
TOKEN = "" # Токен с сайта (access_token)
```

Соберите проект и просто запустите сервер:
```cmd
npx tsc
npm start
```

# Быстрый запуск:
Рекомендуем использовать Docker.

## Используя Docker

### Windows

1. Установите [Docker](https://docs.docker.com/desktop/install/windows-install/).
2. Клонируйте репозиторий и перейдите в него:
```bash
git clone https://github.com/TES-Empire/CAI-Server
cd CAI-Server
```
3. Создайте `.env` файл в корневой папке со следующими полями:
```properties
PORT = "" # Порт для CAI сервера
AUTH = "" # Строка которая необходима для авторизации на сервере.
TOKEN = "" # Токен с сайта (access_token)
```
4. Соберите Docker Image и запустите его.
```bash
docker build -t cai-server .
docker run -p 8080:8080 -d cai-server
```

### Linux

1. Установите [Docker](https://docs.docker.com/desktop/install/linux-install/).
2. Клонируйте репозиторий и перейдите в него:
```bash
git clone https://github.com/TES-Empire/CAI-Server
cd CAI-Server
```
3. Создайте `.env` файл в корневой папке со следующими полями:
```properties
PORT = "" # Порт для CAI сервера
AUTH = "" # Строка которая необходима для авторизации на сервере.
TOKEN = "" # Токен с сайта (access_token)
```
4. Соберите Docker Image и запустите его.  
_(Могут потребоваться права суперпользователя)_
```bash
docker build -t cai-server .
docker run -p 8080:8080 -d cai-server
```

## Обычный запуск

1. Установите [NodeJs](https://nodejs.org/en).
2. Клонируйте репозиторий и перейдите в него:
```bash
git clone https://github.com/TES-Empire/CAI-Server
cd CAI-Server
```
3. Установите зависимости и "скомпилируйте" TypeScript файлы:
```bash
npm install
npx tsc
```
4. Создайте `.env` файл в корневой папке со следующими полями:
```properties
PORT = "" # Порт для CAI сервера
AUTH = "" # Строка которая необходима для авторизации на сервере.
TOKEN = "" # Токен с сайта (access_token)
```
5. Запустите сервер:
```bash
npm start
```

# API для общения

Используйте `http://localhost:{PORT}/{characterId}` и радуйтесь жизни :blush:

Для запросов первое что необходимо, это `characterId`.  
Необходимы 2 поля в body это `content` и `username`, а так же header `Authorization` с вашем секретным ключём (или как вариант оставте заголовок пустым).  
Поле `language` опционально. (По умолчанию язык вывода `en`)

`language` формата: `ISO 639-1`

### Пример №1
```js
async function ChatAI(charId) {
	const response = await fetch(
		`http://localhost:8080/${charId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "some_secret_string"
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
async function ChatAI(charId) {
	const response = await fetch(
		`http://localhost:8080/${charId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "some_secret_string"
			},
			body: JSON.stringify({
				content: "How are you?",
				username: "POTI",
				token: 'some_secret_string'
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