import { FaClock } from "react-icons/fa";

const hours = [
  ["Monday", "9:00 AM - 8:00 PM"],
  ["Tuesday", "9:00 AM - 8:00 PM"],
  ["Wednesday", "9:00 AM - 8:00 PM"],
  ["Thursday", "9:00 AM - 8:00 PM"],
  ["Friday", "9:00 AM - 8:00 PM"],
  ["Saturday", "10:00 AM - 6:00 PM"],
  ["Sunday", "Closed"],
];

function BusinessHours() {
  return (
    <section className="py-24 bg-pink-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-pink-500 font-semibold text-sm animate-fade-in">
            Business Hours
          </p>
          <h2 className="text-5xl font-bold mt-4 tracking-tight text-gray-900">
            We're Available
          </h2>
        </div>

        {/* Card Container */}
        <div
          data-aos="zoom-in"
          className="bg-white rounded-[35px] shadow-xl p-8 md:p-12 transition-all duration-500 hover:shadow-2xl backend-card"
        >
          {hours.map(([day, time]) => {
            const isClosed = time === "Closed";
            
            return (
              <div
                key={day}
                className="group flex justify-between items-center py-5 border-b border-gray-100 last:border-none transition-all duration-300 hover:px-4 rounded-xl hover:bg-pink-50/50"
              >
                {/* Left Side: Icon & Day */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-pink-50 text-pink-500 transition-colors duration-300 group-hover:bg-pink-500 group-hover:text-white group-hover:scale-110">
                    <FaClock className="w-4 h-4 transition-transform duration-500 group-hover:rotate-[360deg]" />
                  </div>
                  <span className="font-medium text-gray-800 transition-colors duration-300 group-hover:text-pink-600 group-hover:font-semibold">
                    {day}
                  </span>
                </div>

                {/* Right Side: Timing Status */}
                <span 
                  className={`text-sm md:text-base font-medium transition-all duration-300 group-hover:scale-105 ${
                    isClosed 
                      ? "text-red-400 bg-red-50 px-3 py-1 rounded-full font-semibold" 
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {time}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default BusinessHours;