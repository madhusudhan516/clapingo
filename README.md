# clapingo
An api using node.js, express.js with the help of mongo db database

# Local setup

- Clone the repo and go into `CLAPPINGO` folder
- Create a `.env` containing the following

  ```
  PORT = 5000
  NODE_ENV = development
  ACCESS_SECRET_TOKEN = TOKEN

# database user name, password
  UPDATE USERNAME AND PASSWORD IN MONGO URI
  ```
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.lfdho1f.mongodb.net/?retryWrites=true&w=majority
  dbName=dbname

- To install the dependencies

  ```
   npm install
  ```

- Next run the app

  ```
  npm start
  ```
