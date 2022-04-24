#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"
[ -z "$PLAYER1" ] && echo "Missing \$PLAYER1 environment variable" && exit 1
[ -z "$PLAYER1" ] || echo "Found it! \$PLAYER1 is set to [ $PLAYER1 ]"
[ -z "$PLAYER2" ] && echo "Missing \$PLAYER2 environment variable" && exit 1
[ -z "$PLAYER2" ] || echo "Found it! \$PLAYER2 is set to [ $PLAYER2 ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Create a Game and attach 5 NEAR tokens"
echo ---------------------------------------------------------
echo

near call $CONTRACT createGame --accountId $PLAYER1 --amount 5

echo ---------------------------------------------------------
echo "Step 2: Wait for the process, copy the returned Game ID and give it to PLAYER2"
echo ---------------------------------------------------------

echo ---------------------------------------------------------
echo "Step 3: Join the game which PLAYER1 has created"
echo "near call $CONTRACT joinGame '{\"id\": \"GAME ID\"}' --accountId $PLAYER2 --amount 5"
echo "Change the <GAME ID> field with your GAME ID"
echo ---------------------------------------------------------


exit 0
