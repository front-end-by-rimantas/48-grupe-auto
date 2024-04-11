/* eslint-disable react/prop-types */

import { useState } from "react";

export function Item({ data, onSumChange }) {
    const { name, price, amount: initialAmount } = data;
    const [amount, setAmount] = useState(initialAmount);

    function handleAmountPlus() {
        setAmount(n => n + 1);
        onSumChange(price);
    }

    function handleAmountMinus() {
        if (amount > 0) {
            setAmount(n => n - 1);
            onSumChange(-price);
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{price} Eur</td>
            <td>
                <button onClick={handleAmountMinus}>-</button>
                {amount}
                <button onClick={handleAmountPlus}>+</button>
            </td>
            <td>{price * amount} Eur</td>
        </tr>
    );
}