
import { AssetType, StrategyType, RiskProfile, VerifierRequirement, WizardStep } from "./farm-wizard-types";

export const STEPS: WizardStep[] = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Set the name and basic parameters for your farm"
  },
  {
    id: "strategy",
    title: "Strategy Type",
    description: "Select the investment strategy and target APY"
  },
  {
    id: "assets",
    title: "Collateral Assets",
    description: "Choose assets to be used as collateral"
  },
  {
    id: "risk-profile",
    title: "Risk Profile",
    description: "Define the risk tolerance and parameters"
  },
  {
    id: "verifiers",
    title: "Verifier Requirements",
    description: "Set verifier staking requirements"
  },
  {
    id: "review",
    title: "Review & Deploy",
    description: "Confirm all settings before deployment"
  }
];

export const ASSETS: AssetType[] = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    currentPrice: 2290.45,
    priceChange24h: 2.5
  },
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    currentPrice: 34567.89,
    priceChange24h: 1.3
  },
  {
    id: "usdc",
    symbol: "USDC",
    name: "USD Coin",
    logoUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    currentPrice: 1.00,
    priceChange24h: 0.01
  },
  {
    id: "usdt",
    symbol: "USDT",
    name: "Tether",
    logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    currentPrice: 1.00,
    priceChange24h: 0.02
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "DAI Stablecoin",
    logoUrl: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    currentPrice: 1.00,
    priceChange24h: 0.01
  },
  {
    id: "link",
    symbol: "LINK",
    name: "Chainlink",
    logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    currentPrice: 12.34,
    priceChange24h: -1.2
  },
  {
    id: "uni",
    symbol: "UNI",
    name: "Uniswap",
    logoUrl: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    currentPrice: 5.67,
    priceChange24h: 3.4
  },
  {
    id: "aave",
    symbol: "AAVE",
    name: "Aave",
    logoUrl: "https://cryptologos.cc/logos/aave-aave-logo.png",
    currentPrice: 89.12,
    priceChange24h: -0.5
  }
];

export const STRATEGIES: StrategyType[] = [
  {
    id: "yield-farming",
    name: "Yield Farming",
    description: "Earn returns through liquidity provision in DeFi protocols",
    riskLevel: "medium",
    expectedApy: {
      min: 5,
      max: 15
    }
  },
  {
    id: "liquidity-provision",
    name: "Liquidity Provision",
    description: "Provide liquidity to DEXs and earn trading fees",
    riskLevel: "medium",
    expectedApy: {
      min: 3,
      max: 12
    }
  },
  {
    id: "staking",
    name: "Staking",
    description: "Stake assets to secure networks and earn rewards",
    riskLevel: "low",
    expectedApy: {
      min: 2,
      max: 8
    }
  },
  {
    id: "option-writing",
    name: "Option Writing",
    description: "Generate income by writing options on assets",
    riskLevel: "high",
    expectedApy: {
      min: 8,
      max: 25
    }
  },
  {
    id: "arbitrage",
    name: "Arbitrage",
    description: "Profit from price differences across different markets",
    riskLevel: "high",
    expectedApy: {
      min: 10,
      max: 30
    }
  }
];

export const RISK_PROFILES: RiskProfile[] = [
  {
    id: "conservative",
    name: "Conservative",
    description: "Low risk tolerance, focus on capital preservation",
    sharpeRatio: 1.5,
    volatility: 5
  },
  {
    id: "moderate",
    name: "Moderate",
    description: "Balanced approach, some risk for moderate returns",
    sharpeRatio: 2.0,
    volatility: 12
  },
  {
    id: "aggressive",
    name: "Aggressive",
    description: "High risk tolerance for potentially higher returns",
    sharpeRatio: 2.5,
    volatility: 25
  }
];

export const VERIFIER_REQUIREMENTS: VerifierRequirement[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Standard verification with minimal staking",
    minStake: 1000,
    rewardRate: 2
  },
  {
    id: "enhanced",
    name: "Enhanced",
    description: "Higher security with increased staking requirements",
    minStake: 5000,
    rewardRate: 4
  },
  {
    id: "premium",
    name: "Premium",
    description: "Maximum security with substantial staking requirements",
    minStake: 10000,
    rewardRate: 7
  }
];
