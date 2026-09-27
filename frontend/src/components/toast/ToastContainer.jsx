import { useToast } from "../../context/ToastContext";
import Toast from "./Toast";

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          removeToast={removeToast}
        />
      ))}
    </div>
  );
}

export default ToastContainer;