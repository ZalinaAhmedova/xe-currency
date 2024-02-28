import { useState } from "react";
import { createContext } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState("🇱🇻 EUR - Latvia")
  const [toCurrency, setToCurrency] = useState("🇨🇳 CNY - China")
  const [firstAmount, setFirstAmount] = useState("")

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
