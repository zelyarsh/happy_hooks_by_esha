import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    ({
      type = "success",
      title = "",
      message = "",
    }) => {
      const id = Date.now() + Math.random();

      const toast = {
        id,
        type,
        title,
        message,
      };

      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }, 3500);
    },
    []
  );

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}