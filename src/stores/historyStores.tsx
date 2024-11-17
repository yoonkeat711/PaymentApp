import { create } from 'zustand';
import { HistoryDateTypes } from '../constants/types';

type HistoryStoreType = {
    readonly transactionHistories: HistoryDateTypes[],
    setTransactionHistories: (val: HistoryDateTypes[]) => void;
};

const useHistoryStore = create<HistoryStoreType>((set) => {
    return {
        transactionHistories: [],
        setTransactionHistories: (val) => {
            set({
                transactionHistories: val,
            })
        },
    }
});

export default useHistoryStore;
