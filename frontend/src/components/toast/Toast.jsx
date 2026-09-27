import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

function Toast({ toast, removeToast }) {
  const icons = {
    success: <FaCheckCircle className="text-green-500 text-2xl" />,
    error: <FaTimesCircle className="text-red-500 text-2xl" />,
    warning: <FaExclamationCircle className="text-yellow-500 text-2xl" />,
    info: <FaInfoCircle className="text-blue-500 text-2xl" />,
  };

  const leftBorder = {
    success: "border-green-500",
    error: "border-red-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
  };

  return (
    <div
      className={`
        bg-white
        rounded-2xl
        shadow-2xl
        border-l-4
        ${leftBorder[toast.type]}
        p-5
        flex
        items-start
        gap-4
        min-w-[360px]
        max-w-[420px]
        animate-[slideIn_.35s_ease]
      `}
    >
      {/* Icon */}

      <div className="mt-1">
        {icons[toast.type]}
      </div>

      {/* Content */}

      <div className="flex-1">

        <h3 className="font-bold text-lg">
          {toast.title}
        </h3>

        <p className="text-gray-500 mt-1">
          {toast.message}
        </p>

      </div>

      {/* Close */}

      <button
        onClick={() => removeToast(toast.id)}
        className="text-gray-400 hover:text-red-500 transition"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default Toast;