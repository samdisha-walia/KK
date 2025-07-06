import { createContext, useState } from "react";

export const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success | error

  const showMessage = (msg, msgType = "success") => {
    setMessage(msg);
    setType(msgType);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <FlashMessageContext.Provider value={{ message, type, showMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
