import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useHomepage } from "../../../context/HomepageContext";

function FAQManager() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useHomepage();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question: "", answer: "" });

  const openAdd = () => { setEditing(null); setForm({ question: "", answer: "" }); setShowForm(true); };
  const openEdit = (faq) => { setEditing(faq); setForm({ question: faq.question, answer: faq.answer }); setShowForm(true); };

  const submit = () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    if (editing) updateFaq({ ...editing, ...form });
    else addFaq(form);
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">FAQ Manager</h2>
          <p className="text-gray-500 mt-2">Manage Frequently Asked Questions.</p>
        </div>
        <button onClick={openAdd} className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-xl flex items-center gap-3"><FaPlus />Add FAQ</button>
      </div>

      {showForm && (
        <div className="border rounded-2xl p-6 mb-6 space-y-4">
          <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Question" className="w-full border rounded-xl px-5 py-3" />
          <textarea rows={3} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Answer" className="w-full border rounded-xl px-5 py-3" />
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowForm(false)} className="border px-6 py-2 rounded-xl">Cancel</button>
            <button onClick={submit} className="bg-pink-500 text-white px-6 py-2 rounded-xl">{editing ? "Update FAQ" : "Save FAQ"}</button>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {faqs.map((faq) => (
          <div key={faq._id} className="border rounded-2xl p-6 hover:shadow-md transition">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-xl">{faq.question}</h3>
                <p className="text-gray-500 mt-3">{faq.answer}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => openEdit(faq)} className="bg-blue-500 text-white w-10 h-10 rounded-lg hover:bg-blue-600"><FaEdit /></button>
                <button onClick={() => deleteFaq(faq._id)} className="bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQManager;
