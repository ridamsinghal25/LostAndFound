import React from "react";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] ">
      <h1 className="text-3xl font-bold text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-white">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default PageNotFound;
