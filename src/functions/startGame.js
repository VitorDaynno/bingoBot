const logger = require('../config/logger');
const gameDAO = require('../daos/gameDAO');

module.exports.newGame = async () => {
  logger.info('Starting game');

  const games = await gameDAO.getAll({status: 'open'});

  if (games.length === 0) {
    const game = await gameDAO.create();

    logger.info(`New game started: ${game.insertedId}`);

    return;
  }

  logger.warn('There is an open game!')
};
