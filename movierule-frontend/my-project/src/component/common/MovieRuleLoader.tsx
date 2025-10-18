import React, { useEffect } from "react";
import "./MovieRuleLoader.css";

const MovieRuleLoader: React.FC = () => {
  useEffect(() => {
    const audio = new Audio("/horror.wav");
    audio.volume = 0.6;

    // Attempt autoplay first
    audio.play().catch(() => {
      console.log("Autoplay blocked, waiting for user interaction...");
      const handleClick = () => {
        audio.play();
        window.removeEventListener("click", handleClick);
      };
      window.addEventListener("click", handleClick);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="movierule-loader-container">
      <div className="movierule-logo">
        <span className="letter">M</span>
      </div>
      <div className="loading-text">MovieRule</div>
    </div>
  );
};

export default MovieRuleLoader;

