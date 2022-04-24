import { context, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Game, games, State} from './model';

// knight: 4:6
// rogue: 6:4
// wizard: 7:3


// Call Methods (needs a signer)
export function createGame(): string {
  // attach 5 NEAR to start
  assert(context.attachedDeposit == u128.fromString('5000000000000000000000000'), 'You need to deposit 5 NEAR to start the game!');
  const game = new Game();
  games.set(game.id, game);

  return `You have successfully created a game. This is your game ID: ${game.id}. You are a ${game.player1Race} with ${game.player1Atk} attack points and ${game.player1Dfs} defense points, you both have 100 HP points. Waiting for your opponent to join...`;
}



export function play(id: string, move: string): string {

  // check whether game is initialized
  assert(games.contains(id), 'This game ID is invalid!');

  // find the game
  let game = games.getSome(id);

  
  // set currentPlayer as sender
  let currentPlayer = context.sender;

  // assert turns and game progress
  assert(game.nextPlayer == currentPlayer, 'You need to wait for your opponents turn!');
  assert(game.state == State.InProgress, 'This game is either finished or does not exist!');


  /*
  assert(move == `Attack`, 'You can either Attack or Defense!');  
  assert(move == "Defense", 'You can either Attack or Defense!');  
*/

  let message = '';

  if (currentPlayer == game.player1){
    if (move == "Attack" && game.player2Health > 0 && game.player1Health > 0){
      game.player2Health -= game.player1Atk
      message = `You attacked ${game.player2} and damaged ${game.player1Atk}. ${game.player2}'s remaining HP is ${game.player2Health}`
      setNextPlayer(currentPlayer, game)
    }
    else if (move == "Defense" && game.player2Health > 0 && game.player1Health > 0){
      game.player1Health += game.player1Dfs / 2
      message = `You defended yourself from ${game.player2} and gained ${game.player1Dfs/2} HP. Your remaining HP is ${game.player1Health}`
      setNextPlayer(currentPlayer, game)
    }
    else{
      message = 'You can either Attack or Defense!'
    }
  }

  if (currentPlayer == game.player2){
    if (move == "Attack" && game.player2Health > 0 && game.player1Health > 0){
      game.player1Health -= game.player2Atk
      message = `You attacked ${game.player1} and damaged ${game.player2Atk}. ${game.player1}'s remaining HP is ${game.player1Health}`
      setNextPlayer(currentPlayer, game)
    }
    else if (move == "Defense" && game.player2Health > 0 && game.player1Health > 0){
      game.player2Health += game.player2Dfs / 2
      message = `You defended yourself from ${game.player1} and gained ${game.player2Dfs/2} HP. Your remaining HP is ${game.player2Health}`
      setNextPlayer(currentPlayer, game)
    }
    else{
      message = 'You can either Attack or Defense!'
    }
  }


  if(game.player2Health < 1 && currentPlayer == game.player1){
    message = finishGame(game, currentPlayer)
  }
  else if(game.player1Health < 1 && currentPlayer == game.player2){
    message = finishGame(game, currentPlayer)
  }

  game.roundsPlayed++;
  if (game.roundsPlayed > 15) {
    game.state = State.Completed;

    returnMoney(game, game.player1, game.player2);
    return `Looks like both champions are mighty! This is a draw! Each player got their money back.`;
  }
  games.set(game.id, game);
  return message;
}



export function joinGame(id: string): string {
  assert(games.contains(id), 'This game ID is invalid!');
  assert(context.attachedDeposit == u128.fromString('5000000000000000000000000'), 'You need to deposit 5 NEAR to start the game!');

  let game = games.getSome(id);
  assert(game.player2 == '', 'This game is already a pair, you can start a new game by calling this contract again!');
  assert(game.player1 != context.sender, 'You can not join as opponent to your own game!');

  // Player2 deposits 5 NEAR to join the game
  game.totalAmount = u128.add(game.totalAmount, context.attachedDeposit);
  

  game.player2 = context.sender;
  game.state = State.InProgress;

  games.set(id, game);



  return `You have successfully joined the game ${game.player2}. You are a ${game.player2Race} with ${game.player2Atk} attack points and ${game.player2Dfs} defense points, you both have 100 HP points. Waiting for your opponent to make the first move...`;
}

function setNextPlayer(player: string, game: Game): void {
  if (player == game.player1) {
    game.nextPlayer = game.player2;
  } else if (player == game.player2) {
    game.nextPlayer = game.player1;
  }
}


function finishGame(game: Game, player: string): string {
  game.state = State.Completed;

  // transfer NEAR to the winner
  const to_winner = ContractPromiseBatch.create(player);
  const amount_to_receive = game.totalAmount;
  
  to_winner.transfer(amount_to_receive);

  games.set(game.id, game);
  return `We have a champion! ${player} has successfully defeated it's opponent and won ${amount_to_receive} Ⓝ!`
}

function returnMoney(game: Game, player1: string, player2: string): void {
  // transfer NEAR back to players
  const to_player1 = ContractPromiseBatch.create(player1);
  const to_player2 = ContractPromiseBatch.create(player2);

  // amount of NEAR each player deposited
  const amount_to_receive = u128.sub(game.totalAmount, game.creationAmount);
  // logging.log(amount_to_receive);

  to_player1.transfer(amount_to_receive);
  to_player2.transfer(amount_to_receive);

  games.set(game.id, game);
}
