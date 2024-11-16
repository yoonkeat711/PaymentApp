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

export type UserInfo = {
    name: string;
    accountBalance: number;
    accountNumber: string;
}