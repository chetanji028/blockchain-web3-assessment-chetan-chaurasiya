import { useState } from 'react';
import { api } from '../api/client';

export function WalletSection() {
  const [address, setAddress] = useState('0xabc');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await api.getWallet(address);
      // TODO: Candidate - handle balance which may come as number or string from API
      const balance = String(data.balance);

      setResult(`Balance: ${balance}, Nonce: ${data.nonce}`);
  } catch (e) {
    setError(e instanceof Error ? e.message : 'Failed to fetch wallet');
  } finally {
    setLoading(false);
  }
};

  return (
    <section>
      <h2>Wallet</h2>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address (e.g. 0xabc)"
      />
      <button type="button" onClick={fetchWallet} disabled={loading}>
        {loading ? 'Loading...' : 'Get balance'}
      </button>
      {result != null && <div className="result">{result}</div>}
      {error != null && <div className="error">{error}</div>}
    </section>
  );
}
