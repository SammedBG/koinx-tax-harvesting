import { formatCurrency } from '../utils/format';

const GainRow = ({ label, value, highlight }) => {
  const isNeg = value < 0;
  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm" style={{ color: highlight ? 'inherit' : '#94a3b8' }}>{label}</span>
      <span className={`text-sm font-medium ${isNeg ? 'text-red-400' : highlight ? 'text-white' : 'text-emerald-400'}`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
};

const GainSection = ({ title, data, dark }) => (
  <div className={`rounded-xl p-4 mb-3 ${dark ? 'bg-white/5' : 'bg-white/10'}`}>
    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: dark ? '#64748b' : '#bfdbfe' }}>
      {title}
    </p>
    <GainRow label="Profits" value={data.profits} />
    <GainRow label="Losses" value={-data.losses} />
    <div className={`border-t my-2 ${dark ? 'border-white/10' : 'border-white/20'}`} />
    <GainRow label="Net Capital Gains" value={data.net} highlight />
  </div>
);

export default function CapitalGainsCard({ title, data, dark, savings }) {
  if (!data) return null;

  return (
    <div className={`rounded-2xl p-6 flex flex-col ${dark ? 'bg-[#1a1f2e] border border-white/10' : 'bg-gradient-to-br from-[#1a56db] to-[#1e40af]'}`}>
      <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
      {!dark && savings?.hasSavings && (
        <div className="mb-4 bg-white/15 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-xl">🎉</span>
          <p className="text-sm font-medium text-white">
            You're going to save <span className="font-bold">{formatCurrency(savings.savings)}</span>
          </p>
        </div>
      )}

      <GainSection title="Short-Term Gains" data={data.stcg} dark={dark} />
      <GainSection title="Long-Term Gains" data={data.ltcg} dark={dark} />

      <div className={`rounded-xl px-4 py-3 mt-auto ${dark ? 'bg-white/5' : 'bg-white/15'}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-white">Realised Capital Gains</span>
          <span className={`text-base font-bold ${data.realised < 0 ? 'text-red-400' : 'text-white'}`}>
            {formatCurrency(data.realised)}
          </span>
        </div>
      </div>
    </div>
  );
}
