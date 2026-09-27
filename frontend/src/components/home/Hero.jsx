import heroImage from "../../assets/images/hero/hero-image.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative bg-white min-h-[calc(100vh-80px)] flex items-center overflow-hidden font-sans">
      
      {/* Custom Keyframes for Cascade Text Pop & Floating Image */}
      <style>{`
        @keyframes cascadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0) rotate(1.5deg); }
          50% { transform: translateY(-10px) rotate(3.5deg); }
        }
        .animate-cascade {
          opacity: 0;
          animation: cascadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-image-float {
          animation: gentleFloat 6s ease-in-out infinite;
        }
      `}</style>

      {/* Soft Pink Background Glows matching the layout canvas */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-pink-100/30 to-transparent -z-10" />
      <div className="absolute top-1/4 right-[8%] w-2 h-2 bg-pink-300 rounded-full blur-[1px] opacity-60 animate-pulse" />
      <div className="absolute bottom-1/3 right-[4%] w-3 h-3 bg-pink-200 rounded-full blur-[2px] opacity-40" />

      <div className="max-w-7xl mx-auto px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-12 items-center w-full">

        {/* Left Column: Typography Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Main Display Heading with targeted cascade delay layers */}
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-gray-950 leading-[1.1] tracking-tight relative">
            
            <span className="animate-cascade block text-gray-400 font-semibold" style={{ animationDelay: "100ms" }}>
              Handmade <span className="text-gray-800 font-bold">Gifts</span>
              {/* Pink curved directional arrow accent element */}
              <span className="inline-block text-pink-400 text-4xl ml-2 translate-y-[-10px] rotate-45 select-none font-light">↑</span>
            </span>

            <span className="animate-cascade block mt-2 relative text-gray-900" style={{ animationDelay: "250ms" }}>
              {/* Dynamic decorative speed-lines on the left margin */}
              <span className="absolute left-[-45px] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-1.5 opacity-70">
                <span className="w-8 h-[3px] bg-pink-400 rounded-full"></span>
                <span className="w-6 h-[3px] bg-pink-300 rounded-full"></span>
              </span>
              Crafted
            </span>

            <span className="animate-cascade flex items-center gap-4 mt-2 text-gray-900" style={{ animationDelay: "400ms" }}>
              With Love
              {/* Framed Core Heart Icon Emblem */}
              <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-pink-100/70 border border-pink-200 shadow-sm transform scale-110">
                <span className="text-pink-500 text-2xl">♥</span>
              </span>
            </span>

            {/* Premium Handwritten Accent Stroke Line */}
            <span className="animate-cascade block h-[4px] bg-gradient-to-r from-pink-400 to-transparent rounded-full w-64 mt-4" style={{ animationDelay: "550ms" }} />
          </h1>

          {/* Core Descriptive Text Block */}
          <p 
            className="animate-cascade text-gray-500 text-lg sm:text-xl max-w-xl mt-8 leading-relaxed font-medium"
            style={{ animationDelay: "600ms" }}
          >
            Handmade gifts flowers word by word in cascade, <br />
            catchy, even, inviting and premium.
          </p>

          {/* Action Call-to-Response Interface Triggers */}
          <div 
            className="animate-cascade mt-10 flex items-center gap-6"
            style={{ animationDelay: "750ms" }}
          >
            <Link
              to="/shop"
              className="relative bg-pink-400 text-white font-semibold tracking-wide px-10 py-4 rounded-[20px] shadow-[0_10px_25px_rgba(244,63,94,0.2)] hover:bg-pink-500 hover:shadow-[0_15px_30px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Shop Now
              {/* Tiny pointer interaction indicator element */}
              <span className="absolute bottom-[-15px] right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-pink-400">☝</span>
            </Link>

            <Link
              to="/about"
              className="group flex items-center gap-1 border border-pink-100 bg-pink-50/20 text-gray-800 font-bold px-10 py-4 rounded-[20px] hover:bg-pink-50/60 hover:border-pink-200 transition-all duration-300"
            >
              Learn More
              <span className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform">🖲️</span>
            </Link>
          </div>

        </div>

        {/* Right Column: Premium Showcase Image Frame Box */}
        <div 
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Layered Soft Pink Backdrop Shadow Plate Frame */}
          <div className="absolute inset-0 bg-pink-200/40 rounded-[48px] transform rotate-[-2deg] scale-102 blur-[2px] -z-10" />

          {/* Premium Floating Showcase Wrapper */}
          <div className="animate-image-float relative bg-white p-4 pb-6 rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-pink-100/40 max-w-[460px] w-full transform rotate-[2.5deg]">
            
            {/* The primary bouquet photo element */}
            <div className="overflow-hidden rounded-[32px] aspect-[4/5] bg-gray-50">
              <img
                src={heroImage}
                alt="Premium Crafted Crochet Showcase Bouquet"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Minimalist framing border highlight line on lower panel margin */}
            <div className="mt-4 px-2 flex justify-between items-center opacity-40">
              <span className="w-12 h-1 bg-gray-200 rounded-full"></span>
              <span className="w-2 h-2 bg-pink-300 rounded-full"></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;