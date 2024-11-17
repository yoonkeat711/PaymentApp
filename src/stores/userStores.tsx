import { create } from 'zustand';
import { UserInfo } from '../constants/types';

type UserStoreType = {
   readonly userInfo: UserInfo,
    setUserInfo: (val: UserInfo) => void;
};

const useUserStore = create<UserStoreType>((set) => {
    return {
        userInfo: {
            name: "",
            accountBalance: 0,
            accountNumber: ""
        },
        setUserInfo: (val) => {
            set({
                userInfo: val
            })
        },
    }
});

export default useUserStore;
