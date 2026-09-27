import { useState, useEffect } from "react";
import authBanner from "../../assets/images/auth/auth.jpg";

function AuthLayout({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // A tiny delay ensures the animations trigger smoothly right after the page renders
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-pink-50 flex items-center justify-center py-16 px-6 overflow-hidden">

      {/* Main Container: Fades in and floats up softly */}
      <div 
        className={`max-w-7xl w-full bg-white rounded-[35px] overflow-hidden shadow-2xl grid lg:grid-cols-2 transition-all duration-1000 ease-out transform ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >

        {/* Left Side Wrapper (Added 'group' to trigger hover effects on child elements) */}
        <div className="relative hidden lg:block group overflow-hidden bg-pink-900">

          {/* IMAGE ANIMATIONS: Starts zoomed in, settles to normal, then zooms slightly on hover */}
          <img
            src={authBanner}
            alt="Happy Hooks"
            className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out transform group-hover:scale-110 ${
              isLoaded ? "scale-100 opacity-100" : "scale-125 opacity-0"
            }`}
          />

          {/* Overlay Darkens slightly on hover */}
          <div className="absolute inset-0 bg-black/40 transition-all duration-700 group-hover:bg-black/50"></div>

          {/* TEXT CONTAINER */}
          <div className="absolute inset-0 flex flex-col justify-center px-14 text-white">

            {/* Subtitle: Drops down from the top */}
            <p 
              className={`uppercase tracking-[5px] text-pink-300 font-semibold transition-all duration-1000 delay-[300ms] transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            >
              Happy Hooks By Esha
            </p>

            {/* Main Title: Slides in from the left. Shifts right on hover */}
            <h1 
              className={`text-5xl font-bold mt-6 leading-tight transition-all duration-1000 delay-[500ms] transform group-hover:translate-x-3 ${
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              Handmade
              <br />
              {/* Added a micro-interaction to specific words */}
              <span className="inline-block transition-transform duration-500 hover:scale-105 hover:text-pink-200 cursor-default">
                Crochet Gifts
              </span>
              <br />
              Crafted With Love
            </h1>

            {/* Description: Floats up from the bottom */}
            <p 
              className={`mt-8 text-lg text-gray-200 leading-8 transition-all duration-1000 delay-[700ms] transform group-hover:text-white ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Discover beautiful handmade bouquets,
              plushies, flowers, keychains and custom
              crochet creations made especially for you.
            </p>

          </div>

        </div>

        {/* Right Side / Form Area: Fades in last */}
        <div 
          className={`flex items-center justify-center p-10 lg:p-16 transition-all duration-1000 delay-[900ms] transform ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

      </div>

    </section>
  );
}

export default AuthLayout;