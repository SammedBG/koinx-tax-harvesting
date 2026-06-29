import { useState } from 'react';
import { formatCurrency, formatNumber } from '../utils/format';

const INITIAL_VISIBLE = 8;

function GainCell({ gain, balance }) {
  const isPos = gain >= 0;
  return (
    <div>
      <div className={`text-sm font-medium ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPos ? '+' : ''}{formatCurrency(gain)}
      </div>
      <div className="text-xs text-slate-500">{formatNumber(balance)} units</div>
    </div>
  );
}

function AssetCell({ holding }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={holding.logo}
        alt={holding.coin}
        className="w-8 h-8 rounded-full object-cover bg-slate-700 flex-shrink-0"
        onError={e => { e.target.src = 'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg'; }}
      />
      <div>
        <div className="text-sm font-semibold text-white">{holding.coin}</div>
        <div className="text-xs text-slate-400 max-w-[140px] truncate">{holding.coinName}</div>
      </div>
    </div>
  );
}

export default function HoldingsTable({ holdings, selectedIds, onToggle, onToggleAll, loading }) {
  const [showAll, setShowAll] = useState(false);

  const visibleHoldings = showAll ? holdings : holdings.slice(0, INITIAL_VISIBLE);
  const allSelected = holdings.length > 0 && holdings.every(h => selectedIds.has(h.id));
  const someSelected = holdings.some(h => selectedIds.has(h.id)) && !allSelected;

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#1a1f2e] border border-white/10 p-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-white/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#1a1f2e] border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected; }}
                  onChange={() => onToggleAll()}
                  className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                />
              </th>
              {['Asset', 'Holdings / Avg Buy Price', 'Current Price', 'Short-Term Gain', 'Long-Term Gain', 'Amount to Sell'].map(h => (
                <th key={h} className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map(holding => {
              const isSelected = selectedIds.has(holding.id);
              return (
                <tr
                  key={holding.id}
                  onClick={() => onToggle(holding)}
                  className={`border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${isSelected ? 'bg-blue-900/20' : ''}`}
                >
                  <td className="p-4" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(holding)}
                      className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-4"><AssetCell holding={holding} /></td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-white">{formatNumber(holding.totalHolding, 8)}</div>
                    <div className="text-xs text-slate-400">Avg: {formatCurrency(holding.averageBuyPrice)}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-white">{formatCurrency(holding.currentPrice)}</td>
                  <td className="p-4"><GainCell gain={holding.stcg?.gain ?? 0} balance={holding.stcg?.balance ?? 0} /></td>
                  <td className="p-4"><GainCell gain={holding.ltcg?.gain ?? 0} balance={holding.ltcg?.balance ?? 0} /></td>
                  <td className="p-4">
                    {isSelected ? (
                      <span className="text-sm font-medium text-blue-400">{formatNumber(holding.totalHolding, 8)}</span>
                    ) : (
                      <span className="text-xs text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > INITIAL_VISIBLE && (
        <div className="p-4 text-center border-t border-white/10">
          <button
            onClick={() => setShowAll(v => !v)}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            {showAll ? `Show Less ↑` : `View All ${holdings.length} Assets ↓`}
          </button>
        </div>
      )}
    </div>
  );
}
