FROM node:10
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
#CMD npm start