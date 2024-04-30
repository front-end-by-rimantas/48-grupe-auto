/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    userId: -1,
    updateUserId: () => { },
    totalSumToPay: 0,
    updateTotalSumToPay: () => { },
    cartData: [],
    updateCartItemAmount: () => { },
    newestCars: [],
    updateNewestCars: () => { },
    allCars: [],
    updateAllCars: () => { },
    myCars: [],
    updateMyCars: () => { },
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [userId, setUserId] = useState(initialContext.userId);
    const [totalSumToPay, setTotalSumToPay] = useState(initialContext.totalSumToPay);
    const [cartData, setCartData] = useState(initialContext.cartData);
    const [newestCars, setNewestCars] = useState(initialContext.newestCars);
    const [allCars, setAllCars] = useState(initialContext.allCars);
    const [myCars, setMyCars] = useState(initialContext.myCars);

    useEffect(() => {
        const localStatus = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
        const localId = localStorage.getItem('userId');

        if (localStatus) {
            setLoginStatus(localStatus);
        }

        if (localId !== null) {
            setUserId(localId);
        }
    }, []);

    useEffect(() => {
        if (loginStatus === true) {
            localStorage.setItem('userId', userId);
            localStorage.setItem('isLoggedIn', true);

            fetch('http://localhost:4821/api/cart-details')
                .then(res => res.json())
                .then(dataObj => setCartData(dataObj.data))
                .catch(console.error);

            fetch('http://localhost:4821/api/cars/my/' + userId)
                .then(res => res.json())
                .then(dataObj => {
                    if (dataObj.type === 'success') {
                        setMyCars(dataObj.list);
                    } else {
                        console.error(dataObj.message);
                    }
                })
                .catch(console.error);
        }
    }, [loginStatus, userId]);

    function updateLoginStatus(newStatusValue) {
        setLoginStatus(newStatusValue);

        if (newStatusValue === false) {
            localStorage.clear();
        }
    }

    function updateUserId(id) {
        setUserId(id);
    }

    function updateTotalSumToPay(sumChange) {
        setTotalSumToPay(n => n + sumChange);
    }

    function updateNewestCars(list) {
        setNewestCars(list);
    }

    function updateAllCars(list) {
        setAllCars(list);
    }

    function updateMyCars(list) {
        setMyCars(list);
    }

    function addMyNewCar(car) {
        setMyCars(prev => [...prev, car]);
    }

    function deleteMyCar(carId) {
        setMyCars(prev => prev.filter(car => car.id !== carId));
    }

    function updateCartItemAmount(name, amountChange) {
        console.log('>>>', name, amountChange);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        userId,
        updateUserId,
        totalSumToPay,
        updateTotalSumToPay,
        cartData,
        updateCartItemAmount,
        newestCars,
        updateNewestCars,
        allCars,
        updateAllCars,
        myCars,
        updateMyCars,
        addMyNewCar,
        deleteMyCar,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}