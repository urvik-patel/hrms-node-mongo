
# NodeJS + Sequelize Boilerplate

This project is created to follow standard file structure of NodeJS APIs using ExpressJS with Sequelize ORM.

![Node Version](https://img.shields.io/badge/Node-v16.15.1-yellow) 
![npm Version](https://img.shields.io/badge/NPM-v8.11.0-lightgrey)
![license Version](https://img.shields.io/badge/license-MIT-blue)




## Features

- ExpressJS
- Sequelize


## Run Locally

Clone the project

```bash
git clone https://link-to-project
```

Go to the project directory

```bash
cd Node_with_sequelize
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
##App configs
NODE_ENV="development"
PORT=3003

#DB Configs
DB_CONNECTION=mysql

##DB Development
DB_USER_DEV=root
DB_PASSWORD_DEV=root
DB_DATABASE_DEV=demo
DB_HOST_DEV=localhost

#DB Staging
DB_USER_STAGE=root
DB_PASSWORD_STAGE=root
DB_DATABASE_STAGE=demo
DB_HOST_STAGE=staging_url

#DB Production
DB_USER_PROD=root
DB_PASSWORD_PROD=root
DB_DATABASE_PROD=demo 
DB_HOST_PROD=production_url
```




## Installation

Commands for generating migration, model and seeders

Init setup

```bash
npx sequelize-cli init
```

Model + Migration file

```bash
npx sequelize-cli model:generate --name admin_login_token --attributes firstName:string,lastName:string,email:string
```

Migration run

```bash
npx sequelize-cli db:migrate
```

Create Migration Skeleton

```bash
npx sequelize-cli migration:generate --name migration-skeleton
```

Create Seeder

```bash
npx sequelize-cli seed:generate --name adminSeeder
```

Run Seeders

```bash
npx sequelize-cli db:seed:all
```
  OR
```bash
npx sequelize-cli db:seed --seed src/seeders/20200723055910-subAdminAccessSeeder.js

```
## FAQ

#### What is NodeJS ?

Node js is a single-threaded, open-source, cross-platform runtime environment for building fast and scalable server-side and networking applications. It runs on the V8 JavaScript runtime engine, and it uses event-driven, non-blocking I/O architecture, which makes it efficient and suitable for real-time applications. 

#### Why you should use NodeJS ?

 - Language Sharing Across the Stack
 - Rapid Development
 - The Node Package Manager (NPM)
 - Single-Threaded Event Loop
 - Native Support in AWS


![Logo](https://camo.githubusercontent.com/2d5b811d6e6b387e437a58dafbad9144615f6eaa72114b7b0c851ccc92a34275/68747470733a2f2f636f64657472752e636f6d2f696d616765732f616c6c2f4e4f44454a535f434952434c452e676966)


## License

NodeJS boilerplate is [MIT-licensed](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out to us at

[![mi-logo](https://git.mindinventory.com/uploads/-/system/appearance/header_logo/1/mi-logo.png)](https://www.mindinventory.com/)

<a href="https://www.mindinventory.com/contact-us.php?utm_source=gthb&utm_medium=repo&utm_campaign=circular-cards-stack-view">
<img src="https://github.com/Sammindinventory/MindInventory/raw/main/hirebutton.png" width="203" height="43"  alt="app development"/>
</a>
# hrms-node-mongo
