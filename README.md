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
This app was initialized with [create-near-app](https://github.com/near/create-near-app)

# Quick Start

### Dependencies
+ Node.js ≥ 12
+ 
