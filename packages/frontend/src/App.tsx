import { useState } from 'react';
import { WalletSection } from './components/WalletSection';
import { ContractSection } from './components/ContractSection';
import { ChainSection } from './components/ChainSection';
import { api } from './api/client';

export default function App() {
  const [health, setHealth] = useState<string | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);

  const checkHealth = async () => {
    setHealthError(null);
    setHealth('Checking...');
    try {
      const data = await api.health();
      setHealth(data.status === 'ok' ? 'Backend is running' : 'Unexpected status');
    } catch (e) {
      setHealthError(e instanceof Error ? e.message : 'Request failed');
      setHealth(null);
    }
  };

  return (
    <div className="app">
      <h1>Blockchain Assessment</h1>
      <section>
        <h2>API Health</h2>
        <button type="button" onClick={checkHealth}>Check backend</button>
        {health != null && <div className="result">{health}</div>}
        {healthError != null && <div className="error">{healthError}</div>}
      </section>
      <WalletSection />
      <ContractSection />
      <ChainSection />
    </div>
  );
}
