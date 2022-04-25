## Setting up your terminal

The scripts in this folder are designed to help you demonstrate the behavior of the contract(s) in this project.

It uses the following setup:

```sh
# set your terminal up to have 2 windows, A and B like this:
┌─────────────────────────────────┬─────────────────────────────────┐
│                                 │                                 │
│                                 │                                 │
│                A                │                B                │
│                                 │                                 │
│                                 │                                 │
└─────────────────────────────────┴─────────────────────────────────┘
```

### Terminal **A**

*This window is used to compile, deploy and control the contract*
- Environment
  ```sh
  export CONTRACT=        # depends on dev-deployment
  export PLAYER1=           # any account you control

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  # export PLAYER1=example.testnet

  ```

- Commands

  _helper scripts_
  ```sh
  1.dev-deploy.sh                 # helper: build and deploy contracts
  2.create-a-game.sh              # helper: create a new game and let PLAYER2 to join
  3.play.sh                       # helper: ECHO script on how to play
  ```

### Terminal **B**

*This window is used for your opponent's game moves*
- Environment
  ```sh
  export CONTRACT=          # depends on dev-deployment
  export PLAYER2=           # any account you control

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  # export PLAYER2=example.testnet
  ```

