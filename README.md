## Usage

## Pre-requisites
+ Fully configured MongoDB Atlas Cluster running(local or cloud);

+ You may create an index with TTL(time to live) for auto delete documents(records)
 after an amount of seconds has passed. In my case it is set to 2592000 seconds, that is
 equivalent to 30 days. You can [find more about TTL here](https://docs.mongodb.com/manual/tutorial/expire-data/)

+ .env file in root dir with following key=value pairs inside (you must use your cluster connection string and any private unique key string)
```
MONGODB_CONNECTION_STRING = mongodb+srv://<username>:<password>@sandbox.clusterid.mongodb.net/logserver?retryWrites=true&w=majority
API_KEY = d581b9dYourUniqueKey0941d4321
```
+ or you can config environment variables instead:
```
MONGODB_CONNECTION_STRING=yourConnectionStringGoesHere
API_KEY=yourPrivateUniqueKeyGoesHere
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

![Body Example Insomnia](https://github.com/thomasvieira/log-server/blob/main/assets/BodySample.jpg)
