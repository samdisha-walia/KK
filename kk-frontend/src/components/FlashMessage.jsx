import { useContext } from "react";
import { FlashMessageContext } from "../FlashMessageContext";

const FlashMessage = () => {
  const { message, type } = useContext(FlashMessageContext);

  if (!message) return null;

  return (
    <div
      className={`fixed top-6 right-6 max-w-xs w-full rounded shadow-lg border px-4 py-3 leading-relaxed whitespace-normal break-words
        ${
          type === "success"
            ? "bg-green-600 border-green-700 text-white"
            : "bg-red-600 border-red-700 text-white"
        }
        animate-fadeIn`}
      style={{
        fontSize: "1rem",
        fontWeight: 500,
        minHeight: "50px",
        zIndex: 10000,
      }}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
