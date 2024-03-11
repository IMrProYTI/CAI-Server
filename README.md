# CAI-Server

API Сервер Character.AI со встроенным переводчиком!!!

На данный момент стабильнее API я не нашёл. Так что можно использовать это :)

# Быстрый запуск:
_Рекомендуем использовать Docker._

## Используя Docker

### Windows

1. Установите [Docker](https://docs.docker.com/desktop/install/windows-install/).
2. Клонируйте репозиторий и перейдите в него:
```bash
git clone https://github.com/TES-Empire/CAI-Server
cd CAI-Server
```
3. [Настройте Supabase](https://github.com/TES-Empire/CAI-Server/tree/main#настройка-supabase)
4. [Создайте `.env` файл](https://github.com/TES-Empire/CAI-Server/tree/main#создание-env-файла)
5. Соберите Docker Image и запустите его.
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
3. [Настройте Supabase](https://github.com/TES-Empire/CAI-Server/tree/main#настройка-supabase)
4. [Создайте `.env` файл](https://github.com/TES-Empire/CAI-Server/tree/main#создание-env-файла)
5. Соберите Docker Image и запустите его.  
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
4. [Создайте `.env` файл](https://github.com/TES-Empire/CAI-Server/tree/main#создание-env-файла)
5. Запустите сервер:
```bash
npm start
```

# Гайды

## API для общения

Используйте `http://localhost:{PORT}/{characterId}` и радуйтесь жизни :blush:

Для запросов первое что необходимо, это `characterId`, которое берётся с [сайта](beta.character.ai) и вставляется в url.  
Необходимы 2 поля в body это `content` и `username`, а так же header `Authorization` с вашем секретным ключём оставленным на БД.

Поле `language` опционально. (По умолчанию язык вывода `en`)  
`language` формата: `ISO 639-1`

### Пример №1
```js
async function ChatAI(charId) {
	const response = await fetch(
		`http://localhost:8080/${charId}`,
		{
			method: "POST",
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
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "some_secret_string"
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

## Создание .env файла
```properties
PORT=8080 # Порт для CAI сервера
TOKEN=CharacterAiToken # Токен с сайта (access_token)
SUPABASE_URL=https://xxxxxxxx.supabase.co # url вашей БД
SUPABASE_KEY=SecretOrPublicKey # ключ для вашей БД
```

## Настройка Supabase
+ Создайте на [Supabase](https://supabase.com/) аккаунт.
+ Создайте проект, а в нём базу данных под названием `api`.
+ Создайте в таблице два поля `token` ***(string)*** и `is_available` ***(boolean)***.
  + Другие поля установите значение по своему усмотрению.
+ Занесите в поле `token` токен который в будущем будет использоваться в Header'е `Authorization`, а в поле `is_available` установите значение `true`.

Заранее сохраните в `Project Settings` > `Configuration` > `API` строки/ключи в секциях `Project URL` и `Project API keys`.