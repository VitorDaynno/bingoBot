const logger = require('../config/logger')
const mongo = require('../config/mongo');

const saveWinner = async (name, profileName, game) => {
  try {
    const db = await mongo.connect();

    const winner = await db.collection('ranking').updateOne(
      { name },
      {
        $set: { name, profileName },
        $push: { game: game },
      },
      { upsert: true }
    );

    return winner;
  } catch (error) {
    logger.error('An error occurred', error)
  } finally {
    mongo.close();
  }
}

module.exports = {
  saveWinner,
}