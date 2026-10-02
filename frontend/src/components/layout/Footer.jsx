import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121214] text-gray-300 mt-32 border-t border-pink-100/10 relative overflow-hidden">
      {/* Decorative Background Ambient Glow */}
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info Section */}
          <div className="space-y-5">
            <h2 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
              Happy Hooks
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Handmade crochet flowers, bouquets, plushies, keychains, and customized gifts crafted with love.
            </p>
            <div className="space-y-3.5 pt-2 text-sm">
              <p className="flex items-center gap-3 hover:text-pink-400 transition-colors">
                <FaMapMarkerAlt className="text-pink-400 shrink-0" />
                <span>Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-3 hover:text-pink-400 transition-colors">
                <FaPhoneAlt className="text-pink-400 shrink-0" />
                <span>+92 346 4815475</span>
              </p>
              <p className="flex items-center gap-3 hover:text-pink-400 transition-colors">
                <FaEnvelope className="text-pink-400 shrink-0" />
                <span className="break-all">hello@happyhooksbyesha.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-pink-400">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="hover:text-pink-400 transition-colors relative group block w-fit"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories Links */}
          <div>
            <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-pink-400">
              Categories
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              {["Flowers", "Bouquets", "Plushies", "Keychains"].map((cat) => (
                <li key={cat}>
                  <Link 
                    to={`/shop?category=${cat.toLowerCase()}`}
                    className="hover:text-pink-400 transition-colors relative group block w-fit"
                  >
                    {cat}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Payments Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg tracking-wide uppercase mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-pink-400">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[
                  { href: "https://instagram.com/happyhooksbyesha", icon: <FaInstagram /> },
                  { href: "#", icon: <FaFacebook /> },
                  { href: "#", icon: <FaTiktok /> },
                  { href: "#", icon: <FaWhatsapp /> }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/5 hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 text-gray-300 hover:text-white p-3 rounded-xl border border-white/10 hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/20 text-lg"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5">
                Accepted Payments
              </h4>
              <div className="flex gap-2 flex-wrap text-xs font-bold text-gray-400">
                {["Visa", "Mastercard", "JazzCash", "EasyPaisa"].map((provider) => (
                  <span 
                    key={provider} 
                    className="bg-white/[0.04] border border-white/10 px-3 py-2 rounded-xl hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs font-medium text-gray-500 tracking-wide">
        © {currentYear} Happy Hooks By Esha. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;