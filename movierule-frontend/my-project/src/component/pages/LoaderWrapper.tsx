import React, { useEffect, useState } from "react";
import MovieRuleLoader from "../common/MovieRuleLoader";
import MainPage from "./user-pages/MainPage";


const LoaderWrapper: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader for exactly 5 seconds, then reveal MainPage
    const timer = setTimeout(() => setShowLoader(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) return <MovieRuleLoader />;

  return <MainPage />;
};

export default LoaderWrapper;
