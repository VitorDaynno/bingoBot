const logger = require('../config/logger')
const mongo = require('../config/mongo');

const create = async () => {
  try {
    const db = await mongo.connect();

    const game = await db.collection('games').insertOne({
      date: new Date(),
      drawnNumbers: [],
      status: 'open',
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

const getWinners = async (id) => {
  try {
    const db = await mongo.connect();

    const cursor = db.collection('games').aggregate([
      { $match: {_id: id, status: 'open'} },
      { $unwind: '$players'},
      { $project: { name: '$players.player', isWinner: '$players.isWinner' }},
      { $match: { isWinner: true }},
    ]);

    const winners = [];

    for await (const player of cursor) {
      winners.push({...player});
    }

    return winners;
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
  getWinners,
};