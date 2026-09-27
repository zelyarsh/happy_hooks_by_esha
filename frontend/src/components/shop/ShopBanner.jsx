import banner from "../../assets/images/banners/shop-banner.png";
import { Link } from "react-router-dom";

function ShopBanner() {
  return (
    <div className="relative mb-32 overflow-visible">
      {/* Outer Banner Shell Container */}
      <section className="relative h-[580px] md:h-[620px] rounded-[35px] overflow-hidden shadow-[0_20px_50px_rgba(244,63,94,0.1)] group">
        
        {/* Background Image Element */}
        <img
          src={banner}
          alt="Happy Hooks Collection"
          className="w-full h-full object-cover object-center scale-105 group-hover:scale-112 transition-transform duration-[1500ms] ease-out"
        />

        {/* Dynamic Multi-layered Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-pink-950/30 group-hover:opacity-95 transition-opacity duration-700"></div>

        {/* Ambient Decorative Blurry Glares */}
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-pink-400/20 rounded-full blur-[90px] animate-pulse duration-[6000ms]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>

        {/* FIXED: Changed items-center to items-start with top padding & bottom safety buffer */}
        <div className="absolute inset-0 flex items-start pt-12 md:pt-20 pb-24">
          <div className="max-w-2xl ml-6 md:ml-16 lg:ml-24 text-white space-y-4 md:space-y-5">
            
            {/* Animated Eyebrow Header Node */}
            <div className="overflow-hidden">
              <span className="inline-block uppercase tracking-[6px] text-pink-300 font-bold text-xs md:text-sm animate-[slideDown_0.8s_ease-out_both]">
                Handmade With Love ✨
              </span>
            </div>

            {/* Typography Header Block Layer */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] animate-[slideUp_1s_ease-out_0.2s_both]">
              Beautiful Crochet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-white">
                Gifts That
              </span> <br />
              Last Forever
            </h1>

            {/* Accompanying Paragraph Descriptive Text String */}
            <p className="text-sm md:text-base lg:text-gh leading-relaxed text-gray-200 max-w-lg drop-shadow-md opacity-90 animate-[fadeIn_1.2s_ease-out_0.5s_both]">
              Every stitch tells a story. Discover handcrafted bouquets, flowers, 
              plushies, keychains and personalized crochet gifts made with premium 
              cotton yarn and lots of love.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 md:pt-4 animate-[slideUp_1s_ease-out_0.7s_both]">
              <Link
                to="/shop"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-8 py-3.5 rounded-full font-bold shadow-[0_6px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_10px_25px_rgba(244,63,94,0.5)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 text-sm md:text-base"
              >
                Shop Collection
              </Link>

              <Link
                to="/about"
                className="backdrop-blur-sm bg-white/10 border-2 border-white/80 px-8 py-3.5 rounded-full font-bold hover:bg-white hover:text-gray-950 hover:-translate-y-1 active:scale-[0.98] shadow-lg transition-all duration-300 text-sm md:text-base"
              >
                Our Story
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Auxiliary Information Card Block Panel */}
      <div 
        className="absolute left-1/2 -bottom-16 -translate-x-1/2 w-[90%] max-w-5xl bg-white/95 backdrop-blur-md rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-pink-100/40 p-8 transform animate-[slideUp_1s_ease-out_0.9s_both]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-pink-100/60">
          
          <div className="pt-4 md:pt-0 group cursor-pointer">
            <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-rose-500 transform transition-transform duration-500 group-hover:scale-110">
              100%
            </h3>
            <p className="mt-2.5 text-gray-600 text-sm font-semibold tracking-wide uppercase group-hover:text-gray-900 transition-colors">
              Handcrafted Items
            </p>
          </div>

          <div className="pt-6 md:pt-0 group cursor-pointer">
            <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-rose-500 transform transition-transform duration-500 group-hover:scale-110">
              500+
            </h3>
            <p className="mt-2.5 text-gray-600 text-sm font-semibold tracking-wide uppercase group-hover:text-gray-900 transition-colors">
              Happy Customers
            </p>
          </div>

          <div className="pt-6 md:pt-0 group cursor-pointer">
            <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-rose-500 transform transition-transform duration-500 group-hover:scale-110">
              Custom
            </h3>
            <p className="mt-2.5 text-gray-600 text-sm font-semibold tracking-wide uppercase group-hover:text-gray-900 transition-colors">
              Orders Available
            </p>
          </div>

        </div>
      </div>

      {/* Embedded Lightweight In-file Animation Drivers */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

export default ShopBanner;