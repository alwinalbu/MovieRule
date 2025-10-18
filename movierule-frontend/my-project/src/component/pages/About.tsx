import React from "react";
import { motion } from "framer-motion";
import { Film, Star, Globe, PlayCircle } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
      {/* 🎥 Background Overlay */}
      <div className="absolute inset-0 bg-[url('/cinema-bg.png')] bg-cover bg-center opacity-50" />

      {/* 🔥 Animated Red Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-700/10 to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* 🔺 Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6 text-red-500 tracking-wide"
        >
          <span className="text-white">MovieRule</span>
        </motion.h1>

        {/* 🎬 Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg sm:text-xl max-w-3xl text-gray-300 leading-relaxed mb-10"
        >
          MovieRule is not just a platform — it’s a cinematic universe where
          technology meets storytelling. From movie ticket bookings to
          high-quality online streaming, we’re redefining how you experience
          films.
        </motion.p>

        {/* 🎞️ Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 max-w-5xl">
          {[
            {
              icon: <Film size={40} />,
              title: "Seamless Booking",
              desc: "Find theatres, select seats, and book tickets instantly — all in one place.",
            },
            {
              icon: <PlayCircle size={40} />,
              title: "Stream Anywhere",
              desc: "Enjoy your favorite films on any device with crystal-clear streaming quality.",
            },
            {
              icon: <Star size={40} />,
              title: "Exclusive Content",
              desc: "Access premium movies and early releases only on MovieRule.",
            },
            {
              icon: <Globe size={40} />,
              title: "Global Reach",
              desc: "Watch or book from anywhere — connecting movie lovers worldwide.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.2, duration: 0.6 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-red-600 hover:shadow-[0_0_25px_-5px_#e50914] transition duration-300"
            >
              <div className="text-red-500 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 💡 Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-20 max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission 🎯</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            At <span className="text-red-500 font-semibold">MovieRule</span>, we
            believe movies are more than entertainment — they are stories that
            connect people. Our goal is to bring every film lover closer to
            their next unforgettable experience — anytime, anywhere.
          </p>
        </motion.div>

        {/* ❤️ Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 text-sm text-gray-500"
        >
          <p>© {new Date().getFullYear()} MovieRule. All Rights Reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
