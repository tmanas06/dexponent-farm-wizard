
export type AssetType = {
  id: string;
  symbol: string;
  name: string;
  logoUrl: string;
  currentPrice?: number;
  priceChange24h?: number;
};

export type StrategyType = {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedApy: {
    min: number;
    max: number;
  };
};

export type RiskProfile = {
  id: string;
  name: string;
  description: string;
  sharpeRatio: number;
  volatility: number;
};

export type VerifierRequirement = {
  id: string;
  name: string;
  description: string;
  minStake: number;
  rewardRate: number;
};

export type FarmData = {
  farmName: string;
  strategyType: string;
  collateralAssets: string[];
  targetApy: number;
  riskProfile: string;
  verifierRequirements: string;
  minStakeAmount: number;
  maxFarmSize: number;
  lockupPeriod: number;
  feeStructure: {
    managementFee: number;
    performanceFee: number;
  };
};

export type WizardStep = {
  id: string;
  title: string;
  description: string;
};
