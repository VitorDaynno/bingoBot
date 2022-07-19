const logger = require('../config/logger')
const mongo = require('../config/mongo');

const create = async () => {
  try {
    const db = await mongo.connect();

    const game = await db.collection('games').insertOne({
      date: new Date(),
      status: 'open'
    });

    return game;
  } catch (error) {
    logger.error('An error occurred', error)
  } finally {
    mongo.close();
  }
}

const getAll = async (filter={}) => {
  try {
    const db = await mongo.connect();

    const games = await db.collection('games').find(filter).toArray();

    return games || [];
  } catch (error) {
    logger.error('An error occurred', error)
  } finally {
    mongo.close();
  }
}

const update = async (id, data) => {
  try {
    const db = await mongo.connect();

    const game = await db.collection('games').updateOne({ _id: id }, {
      $set: data
    });

    return game;
  } catch (error) {
    logger.error('An error occurred', error)
  } finally {
    mongo.close();
  }
}

module.exports = {
  create,
  getAll,
  update,
};