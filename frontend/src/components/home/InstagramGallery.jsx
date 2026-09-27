import { FaInstagram, FaPlay } from "react-icons/fa";

import img1 from "../../assets/images/instagram/insta1.jpeg";
import img2 from "../../assets/images/instagram/insta2.jpeg";
import img3 from "../../assets/images/instagram/insta3.jpeg";
import img4 from "../../assets/images/instagram/insta4.jpeg";

import video1 from "../../assets/images/instagram/video1.mp4";
import video2 from "../../assets/images/instagram/video2.mp4";

const gallery = [
  {
    type: "image",
    src: img1,
  },
  {
    type: "video",
    src: video1,
  },
  {
    type: "image",
    src: img2,
  },
  {
    type: "image",
    src: img3,
  },
  {
    type: "video",
    src: video2,
  },
  {
    type: "image",
    src: img4,
  },
];

function InstagramGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="uppercase tracking-[5px] text-pink-500 font-semibold">
            Follow Us
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Instagram Gallery
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Explore our handmade crochet creations, behind-the-scenes
            moments, and customer favorites.
          </p>

        </div>

        {/* Gallery */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {gallery.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition duration-500"
            >

              {item.type === "image" ? (

                <img
                  src={item.src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />

              ) : (

                <video
                  src={item.src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                />

              )}

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

                {item.type === "image" ? (

                  <FaInstagram className="text-white text-5xl" />

                ) : (

                  <div className="bg-white rounded-full p-5">

                    <FaPlay className="text-pink-500 text-2xl" />

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default InstagramGallery;