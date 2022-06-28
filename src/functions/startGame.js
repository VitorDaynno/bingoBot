const gameDAO = require('../daos/gameDAO');

module.exports.newGame = async () => {
  console.log('Um jogo vai ser iniciado!');

  const games = await gameDAO.getAll({status: 'open'});

  if (games.length === 0) {
    const game = await gameDAO.create();
    console.log(`Novo jogo iniciado`);
  }
};
