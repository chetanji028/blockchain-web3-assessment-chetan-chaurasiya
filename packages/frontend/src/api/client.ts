const API_BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || res.statusText);
  }
  return res.json() as Promise<T>;
}

export const api = {
  health: () => request<{ status: string }>('/health'),

  getWallet: (address: string) =>
    request<{ address: string; balance: string | number; nonce: number }>(`/wallet/${encodeURIComponent(address)}`),

  getContractBalance: (contractAddress: string) =>
    request<{ success: boolean; balance: string }>(`/contract/balance/${encodeURIComponent(contractAddress)}`),

  deposit: (body: { contractAddress: string; fromAddress: string; amount: string }) =>
    request<{ success: boolean; newContractBalance?: string }>('/contract/deposit', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  withdraw: (body: { contractAddress: string; toAddress: string; amount: string; callerAddress: string }) =>
    request<{ success: boolean; newContractBalance?: string }>('/contract/withdraw', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getBlocks: (limit?: number) =>
    request<{ blocks: Array<{ number: number; hash: string; timestamp: number }> }>(
      limit != null ? `/chain/blocks?limit=${limit}` : '/chain/blocks'
    ),

  getBlock: (number: number) =>
    request<{ number: number; hash: string; timestamp: number }>(`/chain/blocks/${number}`),
};
