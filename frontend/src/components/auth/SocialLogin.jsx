import { FcGoogle } from "react-icons/fc";

function SocialLogin({ text }) {
  return (
    <button
      type="button"
      className="w-full border-2 border-gray-200 rounded-full py-4 flex items-center justify-center gap-3 font-semibold hover:border-pink-400 hover:shadow-lg transition-all duration-300"
    >
      <FcGoogle className="text-2xl" />

      Continue with {text}
    </button>
  );
}

export default SocialLogin;