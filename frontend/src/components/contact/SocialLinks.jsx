import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

const socials = [
  {
    icon: <FaInstagram />,
    name: "Instagram",
    link: "https://www.instagram.com/happyhooksbyesha?igsh=MXUxNzV3ZnR3c2Y1eg==&utm_source=ig_contact_invite",
  },
  {
    icon: <FaFacebook />,
    name: "Facebook",
    link: "https://www.facebook.com/share/1CzhtqGqjP/?mibextid=wwXIfr",
  },
  {
    icon: <FaWhatsapp />,
    name: "WhatsApp",
    link: "https://wa.me/#", // Replace # with your phone number if needed
  },
  {
    icon: <FaTiktok />,
    name: "TikTok",
    link: "https://www.tiktok.com/@happyhooksbyesha?_r=1&_t=ZS-97pqgMSgIIj",
  },
];

function SocialLinks() {
  return (
    <section className="py-24 bg-pink-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center">
          <p className="uppercase tracking-[4px] text-pink-500 font-semibold text-sm">
            Follow Us
          </p>
          <h2 className="text-5xl font-bold mt-4 tracking-tight text-gray-950">
            Let's Stay Connected
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {socials.map((social, index) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative flex flex-col items-center justify-center border border-pink-100 bg-white rounded-[32px] p-10 text-gray-800 transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(244,63,94,0.04)] hover:shadow-[0_20px_40px_rgba(236,72,153,0.1)] hover:bg-pink-50/30"
            >
              {/* Icon Container - Uniform website styling */}
              <div className="text-4xl w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-pink-500/20">
                {social.icon}
              </div>

              {/* Title Text */}
              <h3 className="text-xl font-bold mt-6 tracking-wide text-gray-800 transition-colors duration-300 group-hover:text-pink-600">
                {social.name}
              </h3>

              {/* "Follow" Mini-Label */}
              <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-pink-500 transition-colors duration-300">
                Visit Profile →
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SocialLinks;