# NEAR - Duel of Champions

- This contract is a game which you can play with 2 players. It's a turn based, basic Attack/Defense game which has 3 different champion classes and 6 different skill points. The points are distributed random and based on the highest skill point, players are assigned to a champion class.
- Each champion has a different Attack/Defense Ratio as stated below:
  - Knight: 4:6 - Attack:Defense
  - Rogue: 6:4 - Attack:Defense
  - Wizard: 7:3 - Attack:Defense
- To play the game, each player has to attach a specific amount of NEAR tokens, winner gets all but if no one wins after 15 turns, the smart contract will call it a draw and return the NEAR tokens to each player.
- While playing the game, players have 2 options: Attack or Defense, each player has a fixed health points and the goal is decreasing your opponents health to zero!
- If player chooses to attack, then player's attack points are deducted from opponents health points.
- If player chooses to defense, then player will gain half of it's defense points as health points.
- The game will continue until one of the player's health is < 0. When this condition is met, the winner will be deposited all the NEAR tokens and game will be finished.

---

<a href="https://www.loom.com/share/0da248edd5cf44cc8263fa0fa69af880">
    <p>Duel of Champions - Part 1</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/0da248edd5cf44cc8263fa0fa69af880-with-play.gif">
  </a>


<a href="https://www.loom.com/share/af770717884348f4a4ea532f094979c0">
    <p>Duel of Champions - Part 2</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/af770717884348f4a4ea532f094979c0-1650797297103-with-play.gif">
  </a>
  
  
<a href="https://www.loom.com/share/d843b43e39be4420990a6bb998683277">
    <p>Duel of Champions - Part 3</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/d843b43e39be4420990a6bb998683277-with-play.gif">
  </a>
  
---

This app was initialized with [create-near-app](https://github.com/near/create-near-app)

# Quick Start

### Dependencies

+ Node.js ≥ 12
+ npm
+ NEAR CLI

## Code and other files

1. You can see the contract and it's `model.ts` file in `/contract` folder
2. Currently there is no front-end for the contract but thinking about adding soon!

---

# Deploying on NEAR 
Every smart contract needs a network to run. That network for this project is NEAR. When you run `near dev-deploy`, your smart contract gets deployed to the live NEAR TestNet with a testnet account. This is a shortcut to use while testing your contract. You can make it permanent by creating an actual testnet account from [NEAR Testnet](https://wallet.testnet.near.org/create)

---

# Using your account in the Contract
To run the contract you need at least 2 accounts. After you acquired the accounts either with friends or sub accounts, as stated in the scripts, you can make a variable for easy use such as:

`export CONTRACT=dev123-456`

`export PLAYER1=example.testnet`

`export PLAYER2=example.testnet`

---

# Running the Contract

For this step you can either call scripts or manually run the contract, to do that:
1. Create a new game: `near call $CONTRACT createGame --accountId $PLAYER1 --amount 5`
2. This command will return a Game ID, pass the ID to your opponent and make them join to you with:
3. `near call $CONTRACT joinGame '{"id": "<GAME ID>"}' --accountId $PLAYER2 --amount 5`
4. After getting the confirmation, simply play the game with (You can either Attack or Defense):
5. `near call $CONTRACT play '{"id": "<GAME ID>, "move": "Attack"}' --accountId $PLAYER1`

---

# Functions 
### createGame
+ Creates a game with unique ID (last 6 digits of Block Index) and attaches 5 NEAR Tokens from Player1
+ Creates a new Game object
+ Returns a confirmation message

### joinGame
+ Takes GAME ID as a string
+ Checks the validity of ID then attaches 5 NEAR Tokens from Player 2
+ Sets the game and puts it In Progress state
+ Returns a confirmation message

### play
+ Takes GAME ID and Player's move as a string 
+ Sets the current player as sender
+ Decides Attack and Defense actions
+ Checks the health points to finish/continue to game
+ Returns a confirmation message

### playerAtr
+ Declares skills and classes
+ Creates a random number and turns it into points
+ Assigns a champion class
+ Calculates Overall Score
+ Returns Overall Score

### Game Class
+ Sets the game variables and prepares them for use-in in index.ts

### readValue
+ Reads a key and returns the value from storage

### write
+ Takes a key and value as arguments and writes it to storage

### storageReport
+ Reports the status of storage

### setNextPlayer
+ Decides and sets the opponent as current player

### finishGame
+ Decides on game is finished and declares the winner
+ Deposits the award NEAR Tokens

### returnMoney
+ If smart contract calls it a draw, cancels the game and returns the inital deposited NEAR tokens to it's senders

### viewGame 
+ Takes GAME ID as a string
+ Returns given game's PersistentUnorderedMap structure

### viewAllGames
+ Returns all games' PersistentUnorderedMap structure


Thanks to [NEAR University](https://www.near.university/) and [Patika.dev](https://www.patika.dev/) for incredibly prepared course materials

Thanks to [norrec99](https://github.com/norrec99/Guess-My-Number) for inspiring me :)
