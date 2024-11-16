export enum  TransferType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
};

export type HistoryDateTypes = {
    date: string;
    title: string;
    amount: number;
    transferType: TransferType;
}