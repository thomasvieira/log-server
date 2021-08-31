## Usage

## Pre-requisites
Fully configured MongoDB Atlas Cluster running
.env with following key=value pairs
```
MONGODB_CONNECTION_STRING = mongodb+srv://<username>:<password>@sandbox.clusterid.mongodb.net/logserver?retryWrites=true&w=majority
API_KEY = d581b9dYourUniqueKey0941d4321
```
or you can config environment variables
```
MONGODB_CONNECTION_STRING
API_KEY
```
Note: You can get your connection URI from [cloud.mongodb.com](https://cloud.mongodb.com/) in Atlas > Databases > Connect

### Fork Repository

https://github.com/thomasvieira/log-server

### Clone to your computer

```
$ cd path/to/your/workspace

# clone repository
$ git clone git@github.com:yourGitUsername/log-server
```

### Install Dependencies

```
$ cd log-server

# using Yarn
$ yarn

# using NPM
$ npm install
```

### Use it

```
# development mode
$ yarn dev:server (or `npm run dev:server`)

# production build
$ yarn build (or `npm run build`)
```

With server up and running you can post your logs to http://localhost:3333/log with HTTP method POST, with authentication Header type bearer token with your API_KEY

Example of header using Insomnia
![Header Example Insomnia](https://github.com/thomasvieira/log-server/blob/main/assets/authenticationHeader.jpg)

Example of body using Insomnia
![Header Example Insomnia](https://github.com/thomasvieira/log-server/blob/main/assets/BodySample.jpg)
