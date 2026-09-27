import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("🎉 Thank you! Your message has been sent.");

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      data-aos="fade-left"
      className="bg-white rounded-[35px] shadow-xl p-10"
    >
      <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
        Send Message
      </p>

      <h2 className="text-4xl font-bold mt-3 mb-10">
        We'd Love To Hear From You
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />

        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />

        <input
          type="text"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />

        <textarea
          rows="6"
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message..."
          className="w-full border rounded-2xl p-4 resize-none focus:border-pink-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition flex items-center justify-center gap-3"
        >
          <FaPaperPlane />
          Send Message
        </button>

      </form>
    </div>
  );
}

export default ContactForm;