import { useState, useEffect } from "react";

const announcements = [
  "🌸 Handmade with Love & Crafted Specially For Your Loved Ones",
  "✨ Custom Orders Open! DM Us on Instagram to Design Your Perfect Bouquet",
  "🎨 Choose Your Own Colors! Customize Any Bouquet to Match Their Favorite Aesthetic",
];

function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      
      // Wait for out-fade animation before updating text context
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        setIsFading(false);
      }, 400); 

    }, 4000); // Cycles announcements every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-pink-500 text-white text-xs sm:text-sm font-medium tracking-wide shadow-[0_1px_10px_rgba(244,63,94,0.15)] border-b border-pink-400/20">
      
      {/* Dynamic Slide Canvas Wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex justify-center items-center min-h-[36px]">
        <div 
          className={`text-center transition-all duration-400 ease-in-out select-none ${
            isFading 
              ? "opacity-0 -translate-y-2 blur-[2px]" 
              : "opacity-100 translate-y-0 blur-0"
          }`}
        >
          {announcements[currentIndex]}
        </div>
      </div>

    </div>
  );
}

export default AnnouncementBar;