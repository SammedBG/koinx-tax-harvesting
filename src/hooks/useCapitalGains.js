import { useMemo } from 'react';

export const useCapitalGains = (baseGains, selectedHoldings) => {
  return useMemo(() => {
    if (!baseGains) return null;

    const { stcg: basStcg, ltcg: basLtcg } = baseGains.capitalGains;

    let stcgProfits = basStcg.profits;
    let stcgLosses = basStcg.losses;
    let ltcgProfits = basLtcg.profits;
    let ltcgLosses = basLtcg.losses;

    selectedHoldings.forEach(holding => {
      const stcgGain = holding.stcg?.gain ?? 0;
      const ltcgGain = holding.ltcg?.gain ?? 0;

      if (stcgGain > 0) stcgProfits += stcgGain;
      else if (stcgGain < 0) stcgLosses += Math.abs(stcgGain);

      if (ltcgGain > 0) ltcgProfits += ltcgGain;
      else if (ltcgGain < 0) ltcgLosses += Math.abs(ltcgGain);
    });

    const preStcgNet = basStcg.profits - basStcg.losses;
    const preLtcgNet = basLtcg.profits - basLtcg.losses;
    const preRealised = preStcgNet + preLtcgNet;

    const postStcgNet = stcgProfits - stcgLosses;
    const postLtcgNet = ltcgProfits - ltcgLosses;
    const postRealised = postStcgNet + postLtcgNet;

    const savings = preRealised - postRealised;

    return {
      pre: {
        stcg: { profits: basStcg.profits, losses: basStcg.losses, net: preStcgNet },
        ltcg: { profits: basLtcg.profits, losses: basLtcg.losses, net: preLtcgNet },
        realised: preRealised,
      },
      post: {
        stcg: { profits: stcgProfits, losses: stcgLosses, net: postStcgNet },
        ltcg: { profits: ltcgProfits, losses: ltcgLosses, net: postLtcgNet },
        realised: postRealised,
      },
      savings,
      hasSavings: savings > 0,
    };
  }, [baseGains, selectedHoldings]);
};
