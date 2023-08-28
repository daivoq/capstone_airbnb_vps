FROM node:16

WORKDIR /app

COPY package*json .
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

#private port sẽ chạy
EXPOSE 8080

# node index.js => khởi chạy server
CMD ["npm","run", "start:pord"]