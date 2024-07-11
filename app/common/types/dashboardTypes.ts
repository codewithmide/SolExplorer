export interface TransactionData {
    blockTime: number;
    confirmationStatus: number;
}

export interface ValidatorData {
    nodePubkey: string;
    activatedStake: number;
}
