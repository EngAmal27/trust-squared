export interface Trust {
  flowRate: string;
  id: string;
}

export interface Member {
  id: string;
  inFlowRate: string;
  outFlowRate: string;
  trustScore: string;
  trustees: Trust[];
  trusters: Trust[];
}

export interface DetailsProps {
  memberId: string;
}

export interface VerifierResult {
  isGoodId: boolean;
  isNouns: boolean;
}
