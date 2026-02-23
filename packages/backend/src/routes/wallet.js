'use strict';

const express = require('express');
const { getWallet } = require('../store/chainStore');

const router = express.Router();

// GET /api/wallet/:address - get balance and nonce
router.get('/:address', (req, res) => {
  const { address } = req.params;
  if (!address || !address.startsWith('0x')) {
    return res.status(400).json({ error: 'Invalid address format' });
  }
  const wallet = getWallet(address);
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet not found' });
  }
  // TODO: Candidate - return balance as string (BigInt is not JSON-serializable)
  res.json({
    address: address.toLowerCase(),
    balance: wallet.balance.toString(),
    nonce: wallet.nonce
  });
});

module.exports = router;
