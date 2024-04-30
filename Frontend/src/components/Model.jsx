import React, { useEffect } from "react";

function Model({ message, confirmButton, closeModel }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <>
      <div
        onClick={closeModel}
        className="fixed inset-0 bg-gray-700 bg-opacity-90"
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-30rem p-8 rounded-lg bg-black">
        <h2 className="text-2.5xl font-worksans font-black">STAY TUNED</h2>
        <p className="text-base font-sourceserifpro my-4 lg:my-6 leading-tight font-normal">
          {message}
        </p>
        <button
          onClick={confirmButton}
          className="w-50% mt-1 bg-[#08ec5f] p-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
        >
          Confirm
        </button>
      </div>
    </>
  );
}

export default Model;
