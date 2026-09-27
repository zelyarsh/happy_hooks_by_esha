import { useState } from "react";

function ProfileInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Happy Customer",
    email: "customer@email.com",
    phone: "+92 300 1234567",
    city: "Gujrat, Pakistan",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", profileData);
    // Trigger your backend API integration update route here
  };

  const formFields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email Node", type: "email" },
    { name: "phone", label: "Phone Connection", type: "text" },
    { name: "city", label: "City / Country Base", type: "text" },
  ];

  return (
    <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(244,63,94,0.03)] border border-pink-100/40 p-8" data-aos="fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Personal Information
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">Your protected platform profile information.</p>
        </div>
        
        {isEditing ? (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold px-5 py-3 rounded-full text-sm transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_5px_15px_rgba(16,185,129,0.25)] text-white font-bold px-6 py-3 rounded-full text-sm transform active:scale-[0.98] transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-[0_5px_15px_rgba(244,63,94,0.25)] text-white font-bold px-6 py-3 rounded-full text-sm transform active:scale-[0.98] transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-gray-700 font-bold text-xs uppercase tracking-wider ml-1">
              {field.label.split(' ')[0]}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={profileData[field.name]}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-2 border rounded-xl px-5 py-4 font-medium transition-all duration-300 focus:outline-none ${
                isEditing
                  ? "border-pink-300 bg-white text-gray-800 focus:ring-4 focus:ring-pink-100/50"
                  : "border-gray-100 bg-gray-50/50 text-gray-500 cursor-not-allowed selection:bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileInformation;