const mongodb = require('mongodb');

const Settings = require('../config/settings');


const settings = new Settings(); 
const uri = settings.mongoUrl;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = async () => {
  await client.connect();

  const db = client.db("bingoBot");

  return db;
}

const close = async () => {
  client.close()
}

module.exports = {
  connect,
  close,
} 
 
