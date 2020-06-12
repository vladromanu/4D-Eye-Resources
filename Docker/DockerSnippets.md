Table of contents  
[TOC]

### Using Variables in Docker-Compose
```
version: '3.1'

services:
  db:
    container_name: Mongo-db
    image: mongo:latest
    restart: always
    volumes:
      - ./myData:/data/db
    environment:
      - MONGO_INITDB_DATABASE=${DATABASE}
      - MONGODB_USER=${USERNAME}
      - MONGODB_PASS=${PASSWORD}
      
    // OR 
    //env_file:
      //- ./secret-stuff.env

    ports:
      - 27020:27017
```

Create new `.env` file 
```
// .env
USERNAME=Bla
PASSWORD=BlaBla
DATABASE=BlaBlaBla
```
Tip: Remember not to leave any spaces between the = sign and the value assigned to your variable, as they will be added to the string.

```docker-compose up```

Tip: You can check which values are assigned to the environment variables by running the following command (in a different terminal):

```docker-compose config```


