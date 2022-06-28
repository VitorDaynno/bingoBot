const mongo = require('../config/mongo');

const create = async () => {
  try {
    const db = await mongo.connect();

    await db.collection('games').insertOne({
      date: new Date(),
    });

    console.log('jogo criado!')
  } catch (error) {
    console.log(error)
  } finally {
    mongo.close();
  }
}

const getAll = async (filter={}) => {
  try {
    const db = await mongo.connect();

    const games = await db.collection('games').find(filter).toArray();

    return games;
  } catch (error) {
    console.log(error)
  } finally {
    mongo.close();
  }
}


module.exports = {
  create,
  getAll,
};