#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 1: Build the contract (may take a few seconds)"
echo ---------------------------------------------------------
echo

yarn build:contract

echo
echo
echo ---------------------------------------------------------
echo "Step 2: Deploy the contract"
echo ---------------------------------------------------------
echo

# uncomment out the line below to deploy the other example contract
# near dev-deploy ./build/debug/simple.wasm

# comment the line below to deploy the other example contract
near dev-deploy

echo
echo
echo ---------------------------------------------------------
echo "Step 3: Prepare your environment for next steps"
echo
echo "(a) find the contract (account) name in the message above"
echo "    it will look like this: [ Account id: dev-###-### ]"
echo
echo "(b) set an environment variable using this account name"
echo "    see example below (this may not work on Windows)"
echo
echo ---------------------------------------------------------
echo 'export CONTRACT=<dev-123-456>'
echo 'export PLAYER1=example.testnet -> set the player1 like this'
echo 'export PLAYER2=example.testnet -> set the player2 like this'
echo ---------------------------------------------------------
echo

exit 0
