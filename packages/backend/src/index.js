'use strict';

const express = require('express');
const cors = require('cors');
const walletRoutes = require('./routes/wallet');
const contractRoutes = require('./routes/contract');
const chainRoutes = require('./routes/chain');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/wallet', walletRoutes);
app.use('/api/contract', contractRoutes);
app.use('/api/chain', chainRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'blockchain-api' });
});

// TODO: Candidate - add global error handler middleware that returns { error: message } and status 500
// app.use((err, req, res, next) => { ... });

//  Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
