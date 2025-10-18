import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  // Show button only after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Footer */}
      <footer className="bg-[#141414] text-gray-400 px-4 py-4">
        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-2">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <Youtube className="w-5 h-5 hover:text-white transition" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-gray-500 text-center">
          © 2025 MovieRule, Inc.
        </p>
      </footer>

      {/* Floating Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;
