# Life's Password Manager


This is a typescript and react base password manager ,
## Features

- End to End Encryption
- Register and Login functionality
- One Vault for one user/


## Tech

Life's password manager uses following open source repos.

- [Nextjs](https://nextjs.org/) - React library to make dynamic pages 
- [Node.js](https://nodejs.org/) - evented I/O for the backend
- [Fasitfy](https://www.fastify.io/) - fast node.js network app framework 
- [tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework

## Installation

Life's Password manager requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

#### setup Client: 
```sh
cd client
npm i or yarn
```
copy **.example-env.local** to **.env.local**
change **NEXT_PUBLIC_API_ENDPOINT** to your backend end url default is **localhost:4000**

#### setup Server: 

```sh
cd server
npm i or yarn
```
copy **.env.example** to **.env**
##### env setup
 DB_URL = mongodb connection url(create a free mongodb database [here](https://www.mongodb.com/atlas/database))
    if left empty then server uses your local mongodb serrver

## Run
```
cd client
npm run dev

cd server
npm run dev
```


## License

MIT


