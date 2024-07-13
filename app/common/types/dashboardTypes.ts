export interface TransactionData {
    blockTime: number;
    confirmationStatus: number;
}

export interface ValidatorData {
    nodePubkey: string;
    activatedStake: number;
}

export type SearchResult = {
    type: "Account" | "Transaction" | "Block" | "Program" | "Token";
    value: string;
} | null;