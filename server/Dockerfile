FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Delete command for production mode
# RUN npm run build

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000