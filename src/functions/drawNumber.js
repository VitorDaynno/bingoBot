const logger = require('../config/logger');
const gameDAO = require('../daos/gameDAO');

module.exports.draw = async () => {
  const game = (await gameDAO.getAll({status: 'open'}))[0];

  if(!game) {
    logger.error('There is not open games');
    return;
  }

  const number = drawNumber(game);

  shareNumber(game, number);
}

const drawNumber = (game) => {
  logger.info('Drawing number');

  const min = 1;
  const max = 100;
  const drawnNumbers = game.drawnNumbers || [];

  const number = Math.floor(Math.random() * (max - min)) + min;

  if (drawnNumbers.includes(number)) {
    logger.info('number already drawn: ', number);

    return drawNumber(game);
  }

  return number;
}

const shareNumber = (game, number) => {
  const { players } = game;

  for(const player of players) {
    const { card } = player;

    if (card.includes(number)) {
      player.drawnNumbers.push(number);

      if (card.length === player.drawNumber.length) {
        logger.info('Player %s won', player.player);
      }
    }
  }

  //TODO: update the game
}