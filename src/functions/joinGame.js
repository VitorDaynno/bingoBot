const logger = require('../config/logger');
const gameDAO = require('../daos/gameDAO');

module.exports.run = async (players) => {
  const game = (await gameDAO.getAll({status: 'open'}))[0];

  if(!game) {
    logger.error('There is not open games');
    return;
  }

  const playersCards = [];

  for(const player of players) {
    const card = createCard(player);

    playersCards.push(card);
  }

  game.players = playersCards;

  logger.info('Updating game: %s', game);
  await gameDAO.update(game._id, game);
}

const createCard = (player) => {
  logger.info('Creating card to player: %s', player);

  const card = generateCard();

  return { player, card, drawNumber: []};
}

const generateCard = () => {
  let quantity = 0;
  const limit = 24;

  const card = [];

  while(quantity < limit) {
    const number = Math.floor(Math.random() * 100) + 1;
    
    if (!card.includes(number)) {
      card.push(number);

      quantity++;
    }
  }

  return card.sort((a, b) => a-b);
}