const logger = require('../config/logger');
const gameDAO = require('../daos/gameDAO');

module.exports.draw = async () => {
  const game = (await gameDAO.getAll({status: 'open'}))[0];

  if(!game) {
    logger.error('There is not open games');
    return;
  }

  const number = drawNumber(game);

  // shareNumber(game, number);
  verifyWinners(game);
}

const drawNumber = (game) => {
  logger.info('Drawing number');

  const min = 1;
  const max = 100;
  const drawnNumbers = game.drawnNumbers || [];

  const number = Math.floor(Math.random() * (max - min)) + min;

  if (drawnNumbers.includes(number)) {
    logger.info('number already drawn: %s', number);

    return drawNumber(game);
  }

  return number;
}

const shareNumber = async (game, number) => {
  logger.info('The number drawn was %s', number);
  const { _id, players, drawnNumbers } = game;

  for(const player of players) {
    const { card } = player;

    if (card.includes(number)) {
      logger.info('The player %s has the number', player.player)
      player.drawnNumbers.push(number);

      if (card.length === player.drawnNumbers.length) {
        logger.info('Player %s won', player.player);
        player.isWinner = true;
      }
    }
  }

  await gameDAO.update(
    _id,
    { players, drawnNumbers: [...drawnNumbers, number]}
  );
}

const verifyWinners = async (game) => {
  const winners = await gameDAO.getWinners(game._id);

}