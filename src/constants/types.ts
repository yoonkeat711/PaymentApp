export enum  TransferType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT'
};

export type HistoryDateTypes = {
    date: Date;
    title: string;
    amount: number;
    accountNumber: number;
    transferType: TransferType;
}

export type UserInfo = {
    name: string;
    accountBalance: number;
    accountNumber: string;
}