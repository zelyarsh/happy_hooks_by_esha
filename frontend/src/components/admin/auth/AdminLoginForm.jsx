import { useState } from "react";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

function AdminLoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // Backend integration later
  };

  return (
    <div className="w-full max-w-md">

      <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
        Welcome Back
      </p>

      <h1 className="text-5xl font-bold mt-4">
        Admin Login
      </h1>

      <p className="text-gray-500 mt-5 leading-8">
        Sign in to manage Happy Hooks By Esha.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >

        <div className="relative">

          <FaEnvelope className="absolute left-5 top-5 text-pink-400" />

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-14 pr-5 py-4 rounded-xl border focus:outline-none focus:border-pink-500"
          />

        </div>

        <div className="relative">

          <FaLock className="absolute left-5 top-5 text-pink-400" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-14 pr-5 py-4 rounded-xl border focus:outline-none focus:border-pink-500"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3"
        >
          Login

          <FaArrowRight />
        </button>

      </form>

    </div>
  );
}

export default AdminLoginForm;