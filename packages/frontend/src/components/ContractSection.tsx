import { useState } from 'react';
import { api } from '../api/client';

export function ContractSection() {
  const [contractAddress, setContractAddress] = useState('0xcontract1');
  const [balanceResult, setBalanceResult] = useState<string | null>(null);
  const [depositFrom, setDepositFrom] = useState('0xabc');
  const [depositAmount, setDepositAmount] = useState('100');
  const [withdrawTo, setWithdrawTo] = useState('0xdef');
  const [withdrawAmount, setWithdrawAmount] = useState('50');
  const [callerAddress, setCallerAddress] = useState('0xabc');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    setError(null);
    setBalanceResult(null);
    setLoading(true);
    try {
      const data = await api.getContractBalance(contractAddress);
      setBalanceResult(String(data.balance));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await api.deposit({
        contractAddress,
        fromAddress: depositFrom,
        amount: depositAmount,
      });
      setMessage('Deposit successful');
      fetchBalance();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await api.withdraw({
        contractAddress,
        toAddress: withdrawTo,
        amount: withdrawAmount,
        callerAddress: callerAddress,
      });
      setMessage('Withdraw successful');
      fetchBalance();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Withdraw failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>TokenVault Contract</h2>
      <div>
        <input
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Contract address"
        />
        <button type="button" onClick={fetchBalance} disabled={loading}>
          Get balance
        </button>
        {balanceResult != null && <div className="result">Contract balance: {balanceResult}</div>}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input value={depositFrom} onChange={(e) => setDepositFrom(e.target.value)} placeholder="From address" />
        <input value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="Amount" type="text" />
        <button type="button" onClick={handleDeposit} disabled={loading}>Deposit</button>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <input value={withdrawTo} onChange={(e) => setWithdrawTo(e.target.value)} placeholder="To address" />
        <input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Amount" type="text" />
        <input value={callerAddress} onChange={(e) => setCallerAddress(e.target.value)} placeholder="Caller (owner)" />
        <button type="button" onClick={handleWithdraw} disabled={loading}>Withdraw</button>
      </div>
      {message != null && <div className="result">{message}</div>}
      {error != null && <div className="error">{error}</div>}
    </section>
  );
}
