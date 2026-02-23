'use strict';

const express = require('express');
const TokenVault = require('../contracts/TokenVault');

const router = express.Router();

// POST /api/contract/deposit
router.post('/deposit', (req, res) => {
  const { contractAddress, fromAddress, amount } = req.body;
  if (!contractAddress || !fromAddress || amount === undefined) {
    return res.status(400).json({ error: 'Missing contractAddress, fromAddress, or amount' });
  }
  const result = TokenVault.deposit(contractAddress, fromAddress, amount);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

// POST /api/contract/withdraw
router.post('/withdraw', (req, res) => {
  const { contractAddress, toAddress, amount, callerAddress } = req.body;
  if (!contractAddress || !toAddress || amount === undefined || !callerAddress) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const result = TokenVault.withdraw(contractAddress, toAddress, amount, callerAddress);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json(result);
});

// GET /api/contract/balance/:contractAddress
router.get('/balance/:contractAddress', (req, res) => {
  const { contractAddress } = req.params;
  const result = TokenVault.balanceOf(contractAddress);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  res.json(result);
});

module.exports = router;
