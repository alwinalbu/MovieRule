import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, User, Phone, MapPin, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { URL } from "../../config/constants";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setIsSent(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setIsSent(false), 4000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-950 text-gray-200 overflow-hidden px-6 py-16 lg:py-24">
      {/* 🎥 Cinematic Background */}
      <div className="absolute inset-0 bg-[url('/contact.png')] bg-cover bg-center opacity-50" />

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-800/10 via-transparent to-transparent" />

      {/* 📨 Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-gray-900/70 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-gray-800 max-w-lg w-full lg:mr-10"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-red-500">Contact</span> Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 font-medium">Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-2.5 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 font-medium">Email</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-gray-500"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-2 font-medium">Phone</label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-2.5 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm mb-2 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="e.g., Refund issue, Technical help..."
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-2 font-medium">Message</label>
            <div className="relative">
              <MessageCircle
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-all shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>

        {/* ✅ Success Message */}
        {isSent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-center mt-6 font-medium"
          >
            ✅ Message sent successfully! We’ll get back to you soon.
          </motion.p>
        )}
      </motion.div>

      {/* 🏢 Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mt-10 lg:mt-0 bg-gray-900/60 p-8 rounded-2xl border border-gray-800 shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-semibold text-red-500 mb-6">
          Get in Touch
        </h2>
        <ul className="space-y-4 text-gray-300">
          <li className="flex items-start">
            <MapPin className="text-red-500 mr-3 mt-1" size={20} />
            <span>📍 MovieRule HQ, Kochi, Kerala</span>
          </li>
          <li className="flex items-start">
            <Phone className="text-red-500 mr-3 mt-1" size={20} />
            <span>☎️ +91 8129571742</span>
          </li>
          <li className="flex items-start">
            <Mail className="text-red-500 mr-3 mt-1" size={20} />
            <span>✉️ movieruleentertainment@gmail.com</span>
          </li>
          <li className="flex items-start">
            <Clock className="text-red-500 mr-3 mt-1" size={20} />
            <span>🕓 Mon – Fri, 9:00 AM – 6:00 PM</span>
          </li>
        </ul>

        {/* 🌍 Social Links */}
        <div className="mt-6 flex space-x-6 text-gray-400">
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-red-500"
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-red-500"
          >
            <FaTwitter size={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-red-500"
          >
            <FaInstagram size={22} />
          </a>
        </div>

        {/* 🗺 Google Map */}
        <div className="mt-8 rounded-lg overflow-hidden border border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.780650953613!2d76.26730441478665!3d9.98163509287275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d24cb063d97%3A0xeffa2b730cde8743!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1707487261448!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;


