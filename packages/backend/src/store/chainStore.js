'use strict';

// In-memory chain state for assessment (no real blockchain)
const state = {
  blocks: [],
  wallets: new Map(), // address -> { balance, nonce }
  contractStorage: new Map() // contractAddress -> { balance, owner, ... }
};

function getWallet(address) {
  return state.wallets.get(address.toLowerCase());
}

function setWallet(address, data) {
  state.wallets.set(address.toLowerCase(), data);
  return state.wallets.get(address.toLowerCase());
}

function getContract(address) {
  return state.contractStorage.get(address.toLowerCase());
}

function setContract(address, data) {
  state.contractStorage.set(address.toLowerCase(), data);
  return state.contractStorage.get(address.toLowerCase());
}

// Seed initial data
function seed() {
  setWallet('0xabc', { balance: 1000n, nonce: 0 });
  setWallet('0xdef', { balance: 500n, nonce: 0 });
  setContract('0xcontract1', { balance: 0n, owner: '0xabc', name: 'TokenVault' });
  state.blocks.push({ number: 1, hash: '0xblock1', timestamp: Date.now() });
}

seed();

module.exports = {
  state,
  getWallet,
  setWallet,
  getContract,
  setContract
};
