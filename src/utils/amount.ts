export const amountDisplayFormatter = (amount: number | string) => {
    return `RM ${amount.toLocaleString('ms-MY')}`;
}