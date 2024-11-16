export const amountDisplayFormatter = (amount: number | string): string => {
    return `RM ${amount.toLocaleString('ms-MY')}`;
};

export const accountNumberFormatter = (accountNumber: string): string => {
    if (!accountNumber) return '';
    else return  accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

}