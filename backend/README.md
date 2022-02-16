# To start the application

1. start the container 
    `docker container run --name chat_mongodb -p 27017:27017 -d mongo` 
   it will pull automatically the one with the latest tag if none exists

2. Create a user in the db via docker desktop CLI or your favorite termimal
    1. enter the container bash : 
        `docker container exec -it chat_mongodb bash`
    2. access the db : 
        `mongo`
    3. create your database: 
        `chat_application_db`
    4. create the user : 
        `db.createUser({ user: "username", pwd: "password", roles: [] })`
    5. exit : 
        `exit`

3. enable authnetication to the created db : 
    `mongo --port 27017 -u username -p password --authenticationDatabase chat_application_db`

4. exit the CLI: 
    `exit`

5. Create env file
    `env` should be located inside the `/backend/src/` folder
    `PORT` and `MONGODB_URL` environement variables should be provided in the `.env` file
5. install the packages:
    `npm install`

6. start it and ready to code:
    `npm run dev`

### Note : in some cases, you may need to install `ts-node` 