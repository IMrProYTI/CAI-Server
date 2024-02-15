FROM node:18

EXPOSE 8080

COPY . .

RUN apt update
RUN apt install -y chromium

RUN npm install
RUN npx tsc

CMD [ "npm", "start" ]