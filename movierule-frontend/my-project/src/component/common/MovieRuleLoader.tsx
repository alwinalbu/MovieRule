import React from "react";
import "./MovieRuleLoader.css"; // 

const MovieRuleLoader: React.FC = () => {
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
