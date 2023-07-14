// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// const connect = require('./configs/database');
// const redisClient = require('./configs/redisconfig');
// const urlController = require('./controllers/url-controller');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

// app.get('/:code',urlController.getUrl);
// app.post('/urlShorten',urlController.createUrl);

// app.listen('3000',async () => {
//     console.log("Started on port 3000");
//     await connect();
//     await redisClient.connect();
//     console.log('Connected to the DB');
// })

// process.on('SIGINT', async () => {
//     try {
//       // Disconnect the Redis client
//       await redisClient.quit();
//       console.log('Redis client disconnected');
//       process.exit(0); // Exit the process gracefully
//     } catch (error) {
//       console.error('Error while disconnecting Redis client:', error);
//       process.exit(1); // Exit the process with an error
//     }
//   });

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const connect = require('./configs/database');
const urlController = require('./controllers/url-controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/statistics', urlController.getStatistics);
app.get('/:code', urlController.getUrl);
app.post('/urlShorten', urlController.createUrl);

app.listen('3000', async () => {
    console.log("Started on port 3000");
    await connect();
    console.log('Connected to the DB');
  });

process.on('SIGINT', async () => {
  try {
    // Disconnect the Redis client
    redisClient.quit(() => {
      console.log('Redis client disconnected');
      process.exit(0); // Exit the process gracefully
    });
  } catch (error) {
    console.error('Error while disconnecting Redis client:', error);
    process.exit(1); // Exit the process with an error
  }
});
