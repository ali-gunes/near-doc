#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 1: You can play the game either attacking or defensing by specifying your move."
echo "near call $CONTRACT play '{\"id\": \"GAME ID\", \"move\": \"Attack\"}' --accountId $PLAYER1"
echo ---------------------------------------------------------
echo


exit 0
