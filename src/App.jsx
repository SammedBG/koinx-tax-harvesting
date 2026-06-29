import { useState, useEffect, useCallback } from 'react';
import { fetchHoldings, fetchCapitalGains } from './api/mockApi';
import { useCapitalGains } from './hooks/useCapitalGains';
import CapitalGainsCard from './components/CapitalGainsCard';
import HoldingsTable from './components/HoldingsTable';

export default function App() {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loadingHoldings, setLoadingHoldings] = useState(true);
  const [loadingGains, setLoadingGains] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCapitalGains()
      .then(setCapitalGains)
      .catch(() => setError('Failed to load capital gains data'))
      .finally(() => setLoadingGains(false));
    fetchHoldings()
      .then(setHoldings)
      .catch(() => setError('Failed to load holdings data'))
      .finally(() => setLoadingHoldings(false));
  }, []);

  const selectedHoldings = holdings.filter(h => selectedIds.has(h.id));
  const gainsData = useCapitalGains(capitalGains, selectedHoldings);

  const handleToggle = useCallback((holding) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(holding.id) ? next.delete(holding.id) : next.add(holding.id);
      return next;
    });
  }, []);

  const handleToggleAll = useCallback(() => {
    setSelectedIds(prev => {
      const allSelected = holdings.every(h => prev.has(h.id));
      if (allSelected) return new Set();
      return new Set(holdings.map(h => h.id));
    });
  }, [holdings]);

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <header className="border-b border-white/10 bg-[#0f1117]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <span className="font-semibold text-white text-sm">KoinX</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:block">Tax Loss Harvesting Tool</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-1 h-3.5 w-3.5 rounded-full border border-blue-400/70 text-blue-400 flex items-center justify-center text-[10px] leading-none">
              i
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Tax Harvesting</h1>
              <p className="text-slate-400 text-sm mt-1">Tax loss harvesting helps reduce capital gains tax by selling selected holdings at a loss.</p>
            </div>
          </div>

          <details className="group rounded-xl border border-blue-500/30 bg-[#111827] overflow-hidden">
            <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-sm font-medium text-slate-100">
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border border-blue-400/80 text-blue-400 flex items-center justify-center text-[10px] leading-none">
                  i
                </span>
                Important Notes & Disclaimers
              </span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-slate-300 space-y-2 border-t border-blue-500/20">
              <p>• Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</p>
              <p>• Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</p>
              <p>• Price and market value data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</p>
              <p>• Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</p>
              <p>• Only realised losses are considered for harvesting. Unrealized losses in held assets are not counted.</p>
            </div>
          </details>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-900/30 border border-red-700/50 px-4 py-3 text-red-300 text-sm">
            Error: {error}
          </div>
        )}

        {loadingGains ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {[0, 1].map(i => (
              <div key={i} className="rounded-2xl bg-[#1a1f2e] border border-white/10 p-6 h-64 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
                <div className="space-y-3">{[...Array(4)].map((_, j) => <div key={j} className="h-3 bg-white/5 rounded" />)}</div>
              </div>
            ))}
          </div>
        ) : gainsData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <CapitalGainsCard title="Pre Harvesting" data={gainsData.pre} dark={true} />
            <CapitalGainsCard title="After Harvesting" data={gainsData.post} dark={false} savings={gainsData} />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Holdings</h2>
              {selectedIds.size > 0 && (
                <p className="text-xs text-blue-400 mt-0.5">{selectedIds.size} asset{selectedIds.size !== 1 ? 's' : ''} selected</p>
              )}
            </div>
            {selectedIds.size > 0 && (
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-xs text-slate-400 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5"
              >
                Clear selection
              </button>
            )}
          </div>
          <HoldingsTable
            holdings={holdings}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            onToggleAll={handleToggleAll}
            loading={loadingHoldings}
          />
        </div>
      </main>
    </div>
  );
}
