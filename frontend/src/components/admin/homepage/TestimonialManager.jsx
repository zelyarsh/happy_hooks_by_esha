import { useState } from "react";
import { FaPlus, FaTrash, FaStar } from "react-icons/fa";
import { useHomepage } from "../../../context/HomepageContext";

function TestimonialManager() {
  const { testimonials, addTestimonial, deleteTestimonial } = useHomepage();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, review: "" });

  const submit = () => {
    if (!form.name.trim() || !form.review.trim()) return;
    addTestimonial({ ...form, rating: Number(form.rating) });
    setForm({ name: "", rating: 5, review: "" });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <p className="text-gray-500 mt-2">Manage customer testimonials shown on the homepage.</p>
        </div>
        <button onClick={() => setShowForm((prev) => !prev)} className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-xl flex items-center gap-3"><FaPlus />{showForm ? "Cancel" : "Add Testimonial"}</button>
      </div>

      {showForm && (
        <div className="border rounded-2xl p-6 mb-6 space-y-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Customer Name" className="w-full border rounded-xl px-5 py-3" />
          <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="w-full border rounded-xl px-5 py-3">
            {[5, 4, 3, 2, 1].map((n) => (<option key={n} value={n}>{n} Stars</option>))}
          </select>
          <textarea rows={3} value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} placeholder="Review text" className="w-full border rounded-xl px-5 py-3" />
          <div className="flex justify-end"><button onClick={submit} className="bg-pink-500 text-white px-6 py-2 rounded-xl">Save Testimonial</button></div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t._id} className="border rounded-2xl p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{t.name}</h3>
                <div className="flex gap-1 text-yellow-400 mt-1">{[...Array(t.rating)].map((_, i) => (<FaStar key={i} />))}</div>
              </div>
              <button onClick={() => deleteTestimonial(t._id)} className="text-red-500 hover:scale-110 transition"><FaTrash /></button>
            </div>
            <p className="text-gray-500 mt-4">{t.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialManager;
