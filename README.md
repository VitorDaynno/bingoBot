# BingoBot

### Deployment

```
$ serverless deploy
```

### Local run

Start a game

```bash
serverless invoke local --function newGame
```

Add players

```bash
serverless invoke local --function joinGame --data '["player1", "player2"]'
```
