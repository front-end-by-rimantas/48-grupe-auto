/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    totalSumToPay: 0,
    updateTotalSumToPay: () => { },
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [totalSumToPay, setTotalSumToPay] = useState(initialContext.totalSumToPay);

    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);
    }

    function updateTotalSumToPay(sumChange) {
        setTotalSumToPay(n => n + sumChange);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        totalSumToPay,
        updateTotalSumToPay,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}