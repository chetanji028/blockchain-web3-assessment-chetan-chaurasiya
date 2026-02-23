import { useState, useEffect } from 'react';
import { api } from '../api/client';

export function ChainSection() {
  const [blocks, setBlocks] = useState<Array<{ number: number; hash: string; timestamp: number }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // BUG: Candidate - limit should be used when fetching (e.g. pass 5 to get last 5 blocks)
  const limit = 5;

  const fetchBlocks = async () => {
  setError(null);
  setLoading(true);

  try {
    const data = await api.getBlocks(limit); 
    setBlocks(data.blocks);
  } catch (e) {
    setError(e instanceof Error ? e.message : 'Failed to fetch blocks');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <section>
      <h2>Chain (latest blocks)</h2>
      <button type="button" onClick={fetchBlocks} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh blocks'}
      </button>
      {error != null && <div className="error">{error}</div>}
      {blocks.length > 0 && (
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
          {blocks.map((b) => (
            <li key={b.number}>
              Block #{b.number} – {b.hash} – {new Date(b.timestamp).toISOString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
